const { default: mongoose } = require('mongoose');
const Comment = require('../models/commentModel');
const User = require('../models/userModel');

const addComment = async (req, res) => {
	try {
		const { profileUsername, content } = req.body;
		const user = await User.findOne({ username: profileUsername });
		const loggedUser = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		if (!content) {
			return res.status(400).json({ error: 'Comment is required' });
		}

		const commentData = {
			content,
			author: req.user._id,
			author_username: loggedUser.username,
			profile_user: new mongoose.Types.ObjectId(user._id),
		};

		const comment = await Comment.create(commentData);

		if (!comment) {
			return res.status(400).json({ error: 'Error creating comment' });
		}

		res.status(201).json({ message: 'Comment added successfully' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const getComments = async (req, res) => {
	try {
		const profileUsername = req.params.username;
		const user = await User.findOne({ username: profileUsername });

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		const comments = await Comment.find({ profile_user: user._id });

		res.status(200).json(comments);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const editComment = async (req, res) => {
	const { commentId, newContent } = req.body;

	const existingComment = await Comment.findById(commentId);
	if (!existingComment) {
		return res.status(404).json({ error: 'Comment not found' });
	}

	if (existingComment.author.toString() !== req.user._id.toString()) {
		return res
			.status(403)
			.json({ error: 'You do not have permission to edit this comment' });
	}

	existingComment.content = newContent;
	existingComment.edited = true;
	existingComment.updated_at = Date.now();

	const updatedComment = await existingComment.save();

	if (!updatedComment) {
		return res.status(400).json({ error: 'Error updating comment' });
	}

	res.status(200).json({ message: 'Comment edited successfully' });
};

const deleteComment = async (req, res) => {
	try {
		const commentId = req.params.id;

		const existingComment = await Comment.findById(commentId);
		if (!existingComment) {
			return res.status(404).json({ error: 'Comment not found' });
		}

		if (existingComment.author.toString() !== req.user._id.toString()) {
			return res
				.status(403)
				.json({ error: 'You do not have permission to delete this message' });
		}

		await Comment.deleteOne({ _id: commentId });

		res.status(200).json({ message: 'Comment deleted successfully' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

module.exports = { addComment, getComments, editComment, deleteComment };
