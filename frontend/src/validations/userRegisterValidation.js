import * as yup from 'yup';

const usernameRules = /^[a-zA-Z0-9._]+$/;
const passwordRules =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

const userRegisterValidationSchema = yup.object().shape({
	username: yup
		.string()
		.required('Username is required')
		.min(2, 'Username must be at least 2 characters')
		.max(20, 'Username must be at most 20 characters')
		.matches(
			usernameRules,
			'Username can only contain letters, numbers, periods, and underscores'
		),
	password: yup
		.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters')
		.matches(
			passwordRules,
			'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
		),
	confirmPassword: yup
		.string()
		.required('Password confirmation is required')
		.oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default userRegisterValidationSchema;
