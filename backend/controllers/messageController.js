const { default: mongoose, mongo } = require('mongoose');
const Message = require('../models/messageModel');
const User = require('../models/userModel');

const addMessage = async (req, res) => {
	try {
		const { content, receiverId } = req.body;
		const user = await User.findById(receiverId);

		if (!content) {
			return res.status(400).json({ error: 'Message is required' });
		}

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		const messageData = {
			content,
			participants: [
				new mongoose.Types.ObjectId(req.user_id),
				new mongoose.Types.ObjectId(receiverId),
			],
			sender: new mongoose.Types.ObjectId(req.user._id),
			receiver: new mongoose.Types.ObjectId(receiverId),
		};

		const message = await Message.create(messageData);

		if (!message) {
			return res.status(400).json({ error: 'Error creating message' });
		}

		res.status(201).json({ message: 'Message added successfully' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const getMessages = async (req, res) => {
	try {
		const receiverId = req.params.id;
		const user = await User.findById(receiverId);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		const messages = await Message.find({
			$or: [
				{ sender: req.user._id, receiver: receiverId },
				{ sender: receiverId, receiver: req.user._id },
			],
		});

		res.status(200).json(messages);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

const editMessage = async (req, res) => {
	const { messageId, newContent } = req.body;

	const existingMessage = await Message.findById(messageId);
	if (!existingMessage) {
		return res.status(404).json({ error: 'Message not found' });
	}

	if (existingMessage.sender.toString() !== req.user._id.toString()) {
		return res
			.status(403)
			.json({ error: 'You do not have permission to edit this message' });
	}

	existingMessage.content = newContent;
	existingMessage.edited = true;
	existingMessage.updated_at = Date.now();

	const updatedMessage = await existingMessage.save();

	if (!updatedMessage) {
		return res.status(400).json({ error: 'Error updating message' });
	}

	res.status(200).json({ message: 'Message edited successfully' });
};

const deleteMessage = async (req, res) => {
	try {
		const messageId = req.params.id;

		const existingMessage = await Message.findById(messageId);
		if (!existingMessage) {
			return res.status(404).json({ error: 'Message not found' });
		}

		if (existingMessage.sender.toString() !== req.user._id.toString()) {
			return res
				.status(403)
				.json({ error: 'You do not have permission to delete this message' });
		}

		await Message.deleteOne({ _id: messageId });

		res.status(200).json({ message: 'Message deleted successfully' });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

module.exports = { addMessage, getMessages, editMessage, deleteMessage };
