import * as yup from 'yup';

import { Link, useNavigate } from 'react-router-dom';

import Button from '../components/common/Button';
import FormInput from '../components/common/FormInput';
import IconButton from '../components/common/IconButton';
import InlineError from '../components/common/InlineError';
import { PiLockSimpleFill } from 'react-icons/pi';
import { PiUserFill } from 'react-icons/pi';
import { PiXBold } from 'react-icons/pi';
import useAuthorize from '../hooks/useAuthorize';
import { useFormik } from 'formik';
import { useState } from 'react';

const RegisterPage = () => {
	const navigate = useNavigate();
	const { authorize, isLoading } = useAuthorize();
	const [error, setError] = useState('');
	const usernameRules = /^[a-zA-Z0-9._]+$/;
	const passwordRules =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				username: '',
				password: '',
				confirmPassword: '',
			},
			validationSchema: yup.object().shape({
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
			}),
			onSubmit: async (values, { resetForm }) => {
				setError('');

				if (!isLoading) {
					try {
						await authorize('register', {
							username: values.username.toLocaleLowerCase(),
							password: values.password,
						});

						resetForm();
						navigate('/');
					} catch (err) {
						setError(err.message);
					}
				}
			},
		});

	return (
		<div className='flex bg-green-500 p-6 rounded shadow-card flex-col gap-6 w-full max-w-2xl'>
			<div className='flex items-center justify-between'>
				<h2>Register Account</h2>
				<Link to='/'>
					<IconButton icon={PiXBold} />
				</Link>
			</div>
			<form
				className='flex flex-col space-y-6'
				onSubmit={handleSubmit}
				method='POST'
			>
				<FormInput
					icon={PiUserFill}
					placeholder='Username'
					type='text'
					name='username'
					value={values.username}
					onChangeAction={handleChange}
					onBlurAction={handleBlur}
				/>
				{errors.username && touched.username && (
					<InlineError error={errors.username} />
				)}
				<FormInput
					icon={PiLockSimpleFill}
					placeholder='Password'
					type='password'
					name='password'
					value={values.password}
					onChangeAction={handleChange}
					onBlurAction={handleBlur}
				/>
				{errors.password && touched.password && (
					<InlineError error={errors.password} />
				)}
				<FormInput
					icon={PiLockSimpleFill}
					placeholder='Confirm password'
					type='password'
					name='confirmPassword'
					value={values.confirmPassword}
					onChangeAction={handleChange}
					onBlurAction={handleBlur}
				/>
				{errors.confirmPassword && touched.confirmPassword && (
					<InlineError error={errors.confirmPassword} />
				)}
				<Button
					label='Register'
					color='primary'
					size='large'
					additionalStyles='w-full'
					isTypeSubmit={true}
				/>
				{error && <InlineError error={error} />}
			</form>
			<p className='text-center mb-6'>
				Already have an account?{' '}
				<Link to='/login' className='underline'>
					Login
				</Link>
			</p>
		</div>
	);
};

export default RegisterPage;
