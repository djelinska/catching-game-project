import {
	PiCheck,
	PiCheckBold,
	PiLockSimpleFill,
	PiUserFill,
} from 'react-icons/pi';

import Button from '@/components/Button';
import FormInput from '@/components/FormInput';

const EditProfile = () => {
	const username = 'myusername';

	return (
		<div className='card-container-fit'>
			<h2 className='h-[68px] flex items-center'>Edit profile</h2>
			<FormInput icon={PiUserFill} placeholder={username} type='text' />
			<FormInput
				icon={PiLockSimpleFill}
				placeholder='Current Password'
				type='password'
			/>
			<FormInput
				icon={PiLockSimpleFill}
				placeholder='New Password'
				type='password'
			/>
			<div className='flex gap-6'>
				<Button
					label='Save Changes'
					icon={PiCheckBold}
					color='primary'
					size='small'
				/>
				<Button label='Delete Account' color='secondary' size='small' />
			</div>
		</div>
	);
};

export default EditProfile;
