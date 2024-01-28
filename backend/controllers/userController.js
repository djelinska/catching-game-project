const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { createToken } = require('../middleware/authMiddleware');
const { default: mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');

const registerUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const userExists = await User.findOne({ username });

		if (userExists) {
			return res.status(400).json({ error: 'User already exists' });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await User.create({
			username,
			password: hashedPassword,
		});
		const token = createToken(user._id);

		res.cookie(
			'user',
			JSON.stringify({ username, isAdmin: user.is_admin, token }),
			{ httpOnly: true }
		);

		res.status(201).json({ username, isAdmin: user.is_admin, token });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(401).json({ error: 'Invalid username' });
		}

		const passwordsMatch = await bcrypt.compare(password, user.password);

		if (!passwordsMatch) {
			return res.status(401).json({ error: 'Invalid password' });
		}

		const token = createToken(user._id);

		res.cookie(
			'user',
			JSON.stringify({ username, isAdmin: user.is_admin, token }),
			{ httpOnly: true }
		);

		res.status(200).json({ username, isAdmin: user.is_admin, token });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const getUserAccount = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.status(200).json(user);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const editUserAccount = async (req, res) => {
	try {
		const { currentPassword, newPassword } = req.body;
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		const updateFields = {};

		if (currentPassword && newPassword) {
			const passwordsMatch = await bcrypt.compare(
				currentPassword,
				user.password
			);

			if (!passwordsMatch) {
				return res.status(400).json({ error: 'Invalid current password' });
			}

			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(newPassword, salt);

			updateFields.password = hashedPassword;
		}

		await User.findByIdAndUpdate(req.user._id, {
			$set: updateFields,
		});

		res.status(200).json({ message: 'The password has been changed' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const deleteUserAccount = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		if (user.is_admin) {
			return res.status(400).json({ error: 'No option to delete a user' });
		}

		await User.updateMany(
			{ 'friends.user_id': req.user._id },
			{ $pull: { friends: { user_id: req.user._id } } }
		);

		await User.updateMany(
			{ 'notifications.user_id': req.user._id },
			{ $pull: { notifications: { user_id: req.user._id } } }
		);

		await User.findByIdAndDelete(req.user._id);

		res.status(200).json({ message: 'The account has been deleted' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const searchUsers = async (req, res) => {
	const { query } = req.query;

	try {
		const users = await User.find({
			$and: [
				{ _id: { $ne: req.user._id } },
				{ _id: { $nin: req.user.friends.map((friend) => friend.user_id) } },
				{ username: { $regex: new RegExp(query, 'i') } },
			],
		}).select('username');

		res.status(200).json(users);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const getUser = async (req, res) => {
	try {
		const user = await User.aggregate([
			{ $match: { username: req.params.username } },
			{
				$project: {
					username: 1,
					stats: 1,
					createdAt: 1,
					month: { $month: '$createdAt' },
					year: { $year: '$createdAt' },
				},
			},
		]);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.status(200).json(user[0]);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const sendFriendRequest = async (req, res) => {
	try {
		const loggedUserId = req.user._id;
		const { userId } = req.body;

		const loggedUser = await User.findById(loggedUserId);
		if (!loggedUser) {
			return res.status(404).json({ error: 'User not found' });
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		const newFriend = {
			user_id: new mongoose.Types.ObjectId(userId),
			username: user.username,
		};

		await User.findByIdAndUpdate(loggedUserId, {
			$push: { friends: newFriend },
		});

		const newNotification = {
			type: 'friendRequest',
			sender_id: loggedUserId,
			sender_username: loggedUser.username,
		};

		await User.findByIdAndUpdate(userId, {
			$push: { notifications: newNotification },
		});

		res.status(200).json({ message: 'Friend request sent' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const acceptFriendRequest = async (req, res) => {
	try {
		const loggedUserId = req.user._id;
		const { notificationId, userId } = req.body;

		const loggedUser = await User.findById(loggedUserId);
		if (!loggedUser) {
			return res.status(404).json({ error: 'User not found' });
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		await User.findByIdAndUpdate(
			userId,
			{
				$set: { 'friends.$[elem].status': 'accepted' },
			},
			{
				arrayFilters: [{ 'elem.user_id': loggedUserId }],
			}
		);

		const newFriend = {
			user_id: new mongoose.Types.ObjectId(userId),
			username: user.username,
			status: 'accepted',
		};

		await User.findByIdAndUpdate(loggedUserId, {
			$push: { friends: newFriend },
		});

		await User.findByIdAndUpdate(loggedUserId, {
			$pull: { notifications: { _id: notificationId } },
		});

		res.status(200).json({ message: 'Friend request accepted' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const rejectFriendRequest = async (req, res) => {
	try {
		const loggedUserId = req.user._id;
		const { notificationId, userId } = req.body;

		const loggedUser = await User.findById(loggedUserId);
		if (!loggedUser) {
			return res.status(404).json({ error: 'User not found' });
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		await User.findByIdAndUpdate(userId, {
			$pull: { friends: { user_id: loggedUserId } },
		});

		await User.findByIdAndUpdate(loggedUserId, {
			$pull: { notifications: { _id: notificationId } },
		});

		res.status(200).json({ message: 'Friend request rejected' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const getUserFriends = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.status(200).json(user.friends);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const deleteFriend = async (req, res) => {
	try {
		const loggedUserId = req.user._id;
		const { userId } = req.body;

		const loggedUser = await User.findById(loggedUserId);
		if (!loggedUser) {
			return res.status(404).json({ error: 'User not found' });
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		await User.findByIdAndUpdate(loggedUserId, {
			$pull: { friends: { user_id: userId } },
		});

		await User.findByIdAndUpdate(userId, {
			$pull: { friends: { user_id: loggedUserId } },
		});

		res.status(200).json({ message: 'Friend has been deleted' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const getUserNotifications = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.status(200).json(user.notifications);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const getUserTotalScore = async (req, res) => {
	try {
		const totalScore = await User.aggregate([
			{
				$match: {
					_id: req.user._id,
				},
			},
			{
				$project: {
					total_score: '$stats.total_score',
				},
			},
		]);

		res.status(200).json(totalScore);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const saveGameScore = async (req, res) => {
	try {
		const { score, gameType } = req.body;
		const user = await User.findById(req.user._id);

		if (isNaN(score) || parseInt(score) < 0) {
			return res.status(400).json({ error: 'Invalid score' });
		}

		if (
			!(
				gameType === 'const_speed_total_score' ||
				gameType === 'dec_speed_total_score' ||
				gameType === 'rand_speed_total_score'
			)
		) {
			return res.status(400).json({ error: 'Invalid game type' });
		}

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		await User.findByIdAndUpdate(req.user._id, {
			$inc: {
				'stats.play_count': 1,
				'stats.total_score': parseInt(score),
				[`stats.${gameType}`]: parseInt(score),
			},
		});

		res.status(200).json({ message: 'Game score recorded' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const getLeaderBoard = async (req, res) => {
	try {
		const users = await User.aggregate([
			{
				$project: {
					username: 1,
					stats: 1,
				},
			},
			{
				$sort: { 'stats.total_score': -1, username: 1 },
			},
		]);

		res.status(200).json(users);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

module.exports = {
	registerUser,
	loginUser,
	getUserAccount,
	editUserAccount,
	deleteUserAccount,
	searchUsers,
	getUser,
	getUserFriends,
	deleteFriend,
	getUserNotifications,
	sendFriendRequest,
	acceptFriendRequest,
	rejectFriendRequest,
	getUserTotalScore,
	saveGameScore,
	getLeaderBoard,
};
