const { body } = require('express-validator');

const usernameRules = /^[a-zA-Z0-9._]+$/;
const passwordRules =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

const userRegisterValidationRules = [
	body('username')
		.notEmpty()
		.withMessage('Username is required')
		.isLength({ min: 2, max: 20 })
		.withMessage('Username must be between 2 and 20 characters')
		.matches(usernameRules)
		.withMessage(
			'Username can only contain letters, numbers, periods, and underscores'
		),
	body('password')
		.notEmpty()
		.withMessage('Password is required')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters')
		.matches(passwordRules)
		.withMessage(
			'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
		),
	body('confirmPassword')
		.notEmpty()
		.withMessage('Password confirmation is required')
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Passwords must match');
			}
			return true;
		}),
];

module.exports = userRegisterValidationRules;
