import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import IconButton from '@/components/IconButton';
import Link from 'next/link';
import { PiLockSimpleFill } from 'react-icons/pi';
import { PiUserFill } from 'react-icons/pi';
import { PiXBold } from 'react-icons/pi';

const Register = () => {
	return (
		<div className='flex bg-green-500 p-6 rounded shadow-card flex-col gap-6 w-full max-w-2xl'>
			<div className='flex items-center justify-between'>
				<h2>Register Account</h2>
				<Link href='/'>
					<IconButton icon={PiXBold} />
				</Link>
			</div>
			<FormInput icon={PiUserFill} placeholder='Username' type='text' />
			<FormInput
				icon={PiLockSimpleFill}
				placeholder='Password'
				type='password'
			/>
			<FormInput
				icon={PiLockSimpleFill}
				placeholder='Confirm password'
				type='password'
			/>
			<Button
				label='Register'
				color='primary'
				size='large'
				additionalStyles='w-full'
			/>
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
