const { validationResult } = require('express-validator');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (id) => {
	return jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: '3d' });
};

const registerUser = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ message: errors.array() });
	}

	try {
		const { username, password } = req.body;
		const userExists = await User.findOne({ username });

		if (userExists) {
			return res.status(400).json({ message: 'Username already exists' });
		}

		const user = await User.register(username, password);
		const token = createToken(user._id);

		res.status(200).json({ username, token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Something went wrong' });
	}
};

const loginUser = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ message: errors.array() });
	}

	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });

		if (!user) {
			return res.status(400).json({ message: 'Invalid username' });
		}

		const matchPasswords = await bcrypt.compare(password, user.password);

		if (!matchPasswords) {
			return res.status(400).json({ message: 'Invalid password' });
		}

		const token = createToken(user._id);

		res.status(200).json({ username, token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

module.exports = { registerUser, loginUser };
