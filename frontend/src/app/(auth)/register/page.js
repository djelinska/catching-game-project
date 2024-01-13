'use client';

import { useEffect, useState } from 'react';

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
import userRegisterValidationSchema from '@/validations/userRegisterValidation';

const Register = () => {
	const router = useRouter();
	const { authorize, isLoading } = useAuthorize();
	const [registerError, setRegisterError] = useState(null);
	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				username: '',
				password: '',
				confirmPassword: '',
			},
			validationSchema: userRegisterValidationSchema,
			onSubmit: async (values, { setErrors, resetForm }) => {
				setRegisterError(null);

				if (!isLoading) {
					try {
						await authorize(
							{
								...values,
								username: values.username.toLocaleLowerCase(),
							},
							'register'
						);

						resetForm();
						router.push('/');
					} catch (error) {
						if (error.authErrors) {
							setErrors(error.authErrors);
						}
						if (error.authError) {
							setRegisterError(error.authError);
						}
					}
				}
			},
		});

	return (
		<div className='flex bg-green-500 p-6 rounded shadow-card flex-col gap-6 w-full max-w-2xl'>
			<div className='flex items-center justify-between'>
				<h2>Register Account</h2>
				<Link href='/'>
					<IconButton icon={PiXBold} />
				</Link>
			</div>
			<form className='flex flex-col space-y-6' onSubmit={handleSubmit}>
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
					<FormError error={errors.confirmPassword} />
				)}
				<Button
					typeSubmit={true}
					label='Register'
					color='primary'
					size='large'
					additionalStyles='w-full'
				/>
				{registerError && <FormError error={registerError} />}
			</form>
			<p className='text-center mb-6'>
				Already have an account?{' '}
				<Link href='/login' className='underline'>
					Login
				</Link>
			</p>
		</div>
	);
};

export default Register;
