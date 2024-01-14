'use client';

import Button from '@/components/common/Button';
import FormError from '@/components/form/FormError';
import FormInput from '@/components/form/FormInput';
import IconButton from '@/components/common/IconButton';
import Link from 'next/link';
import { PiLockSimpleFill } from 'react-icons/pi';
import { PiUserFill } from 'react-icons/pi';
import { PiXBold } from 'react-icons/pi';
import useAuthorize from '@/components/form/useAuthorize';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import userLoginValidationSchema from '@/validations/userLoginValidation';

const Login = () => {
	const router = useRouter();
	const { authorize, isLoading } = useAuthorize();
	const [loginError, setLoginError] = useState(null);
	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				username: '',
				password: '',
			},
			validationSchema: userLoginValidationSchema,
			onSubmit: async (values, { setErrors, resetForm }) => {
				setLoginError(null);

				if (!isLoading) {
					try {
						await authorize(
							{
								...values,
								username: values.username.toLocaleLowerCase(),
							},
							'login'
						);

						resetForm();
						router.push('/');
					} catch (error) {
						if (error.authErrors) {
							setErrors(error.authErrors);
						}
						if (error.authError) {
							setLoginError(error.authError);
						}
					}
				}
			},
		});

	return (
		<div className='flex bg-green-500 p-6 rounded shadow-card flex-col gap-6 w-full max-w-2xl'>
			<div className='flex items-center justify-between mt-6'>
				<h2>Login</h2>
				<Link href='/'>
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
					<FormError error={errors.username} />
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
					<FormError error={errors.password} />
				)}
				<Button
					typeSubmit={true}
					label='Login'
					color='primary'
					size='large'
					additionalStyles='w-full'
				/>
				{loginError && <FormError error={loginError} />}
			</form>
			<p className='text-center mb-6'>
				Or{' '}
				<Link href='/register' className='underline'>
					Register Account
				</Link>
			</p>
		</div>
	);
};

export default Login;
