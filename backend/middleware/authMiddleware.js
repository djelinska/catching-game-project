const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const createToken = (id) => {
	return jwt.sign({ _id: id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
};

const requireToken = async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ error: 'Authorization required' });
	}

	const token = authorization.split(' ')[1];

	try {
		const { _id } = jwt.verify(token, process.env.TOKEN_SECRET);

		req.user = await User.findById(_id);

		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({ error: 'Authorization failed' });
	}
};

module.exports = { createToken, requireToken };
