const { default: mongoose } = require('mongoose');
const Challenge = require('../models/challengeModel');
const User = require('../models/userModel');

const addChallenge = async (req, res) => {
	try {
		const { opponentId, speed, quantity, senderScore } = req.body;
		const loggedUser = await User.findById(req.user._id);

		const user = await User.findById(opponentId);
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		if (!speed || !quantity) {
			return res.status(400).json({ error: 'Challenge options are required' });
		}

		if (!(speed === 'const' || speed === 'dec' || speed === 'rand')) {
			return res.status(400).json({ error: 'Invalid speed option' });
		}

		if (quantity <= 0) {
			return res.status(400).json({ error: 'Invalid quantity option' });
		}

		if (senderScore < 0 || senderScore > quantity) {
			return res.status(400).json({ error: 'Invalid score' });
		}

		const challenge = await Challenge.create({
			speed,
			quantity: parseInt(quantity),
			sender_id: req.user._id,
			sender_score: parseInt(senderScore),
		});

		if (!challenge) {
			return res.status(400).json({ error: 'Error creating challenge' });
		}

		const newNotification = {
			type: 'challengeRequest',
			sender_id: req.user._id,
			sender_username: loggedUser.username,
			challenge: {
				id: challenge._id,
				speed,
				quantity,
			},
		};

		await User.findByIdAndUpdate(opponentId, {
			$push: { notifications: newNotification },
		});

		res.status(201).json({
			message: 'Challenge created successfully',
			challengeId: challenge._id,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const getChallenge = async (req, res) => {
	try {
		const challengeId = req.params.id;
		const challenge = await Challenge.findById(challengeId);

		res.status(200).json(challenge);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const acceptChallengeRequest = async (req, res) => {
	try {
		const { notificationId, challengeId, score } = req.body;

		const challenge = await Challenge.findById(challengeId);
		if (!challenge) {
			return res.status(400).json({ error: 'Challenge not found' });
		}

		const challengeUser = await User.findById(challenge.sender_id);
		const loggedUser = await User.findById(req.user._id);

		if (score < 0 || score > challenge.quantity) {
			return res.status(400).json({ error: 'Invalid score' });
		}

		await User.findByIdAndUpdate(req.user._id, {
			$pull: { notifications: { _id: notificationId } },
		});

		const result =
			score > challenge.sender_score
				? 'win'
				: score < challenge.sender_score
				? 'lost'
				: 'draw';

		const loggedUserNotification = {
			type: 'challengeResult',
			sender_id: challengeUser._id,
			sender_username: challengeUser.username,
			challenge: {
				speed: challenge.speed,
				quantity: challenge.quantity,
				result,
			},
		};

		const senderNotification = {
			type: 'challengeResult',
			sender_id: loggedUser._id,
			sender_username: loggedUser.username,
			challenge: {
				speed: challenge.speed,
				quantity: challenge.quantity,
				result: result === 'win' ? 'lost' : result === 'lost' ? 'win' : 'draw',
			},
		};

		await User.findByIdAndUpdate(loggedUser._id, {
			$push: { notifications: loggedUserNotification },
		});

		await User.findByIdAndUpdate(challengeUser._id, {
			$push: { notifications: senderNotification },
		});

		await User.findByIdAndUpdate(loggedUser._id, {
			$inc: { 'stats.play_count': 1 },
		});
		await User.findByIdAndUpdate(challengeUser._id, {
			$inc: { 'stats.play_count': 1 },
		});

		if (result === 'win') {
			await User.findByIdAndUpdate(loggedUser._id, {
				$inc: {
					'stats.total_score': 2 * challenge.quantity,
					[`stats.${challenge.speed}_speed_total_score`]:
						2 * challenge.quantity,
				},
			});
		} else if (result === 'lost') {
			await User.findByIdAndUpdate(challengeUser._id, {
				$inc: {
					'stats.total_score': 2 * challenge.quantity,
					[`stats.${challenge.speed}_speed_total_score`]:
						2 * challenge.quantity,
				},
			});
		}

		await Challenge.findByIdAndDelete(challengeId);

		res.status(200).json({ message: 'Challenge accepted' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const rejectChallengeRequest = async (req, res) => {
	try {
		const { notificationId, challengeId } = req.body;

		const challenge = await Challenge.findById(challengeId);
		if (!challenge) {
			return res.status(400).json({ error: 'Challenge not found' });
		}

		await User.findByIdAndUpdate(req.user._id, {
			$pull: { notifications: { _id: notificationId } },
		});

		await Challenge.deleteOne({ _id: challengeId });

		res.status(200).json({ message: 'Challenge rejected' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

module.exports = {
	addChallenge,
	getChallenge,
	acceptChallengeRequest,
	rejectChallengeRequest,
};
