import * as yup from 'yup';

import { Link, useNavigate } from 'react-router-dom';
import { PiLockSimpleFill, PiUserFill, PiXBold } from 'react-icons/pi';

import Button from '../components/common/Button';
import FormInput from '../components/common/FormInput';
import IconButton from '../components/common/IconButton';
import InlineError from '../components/common/InlineError';
import useAuthorize from '../hooks/useAuthorize';
import { useFormik } from 'formik';
import { useState } from 'react';

const LoginPage = () => {
	const navigate = useNavigate();
	const { authorize, isLoading } = useAuthorize();
	const [error, setError] = useState('');
	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				username: '',
				password: '',
			},
			validationSchema: yup.object().shape({
				username: yup.string().required('Username is required'),
				password: yup.string().required('Password is required'),
			}),
			onSubmit: async (values, { resetForm }) => {
				setError('');

				if (!isLoading) {
					try {
						await authorize('login', {
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
			<div className='flex items-center justify-between mt-6'>
				<h2>Login</h2>
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
				<Button
					label='Login'
					color='primary'
					size='large'
					additionalStyles='w-full'
					isTypeSubmit={true}
				/>
				{error && <InlineError error={error} />}
			</form>
			<p className='text-center mb-6'>
				Or{' '}
				<Link to='/register' className='underline'>
					Register Account
				</Link>
			</p>
		</div>
	);
};

export default LoginPage;
