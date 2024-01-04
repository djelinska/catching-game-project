import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import IconButton from '@/components/IconButton';
import Link from 'next/link';
import { PiLockSimpleFill } from 'react-icons/pi';
import { PiUserFill } from 'react-icons/pi';
import { PiXBold } from 'react-icons/pi';

const Login = () => {
	return (
		<div className='inside-container flex-col gap-6 w-full max-w-2xl'>
			<div className='flex items-center justify-between mt-6'>
				<h2>Login</h2>
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
			<Button
				label='Login'
				color='primary'
				size='large'
				additionalStyles='w-full'
			/>
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
