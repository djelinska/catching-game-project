const { body } = require('express-validator');

const userLoginValidationRules = [
	body('username').notEmpty().withMessage('Username is required'),
	body('password').notEmpty().withMessage('Password is required'),
];

module.exports = userLoginValidationRules;
