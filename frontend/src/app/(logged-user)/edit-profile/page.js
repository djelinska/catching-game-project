'use client';

import { PiCheckBold, PiLockSimpleFill } from 'react-icons/pi';

import Button from '@/components/common/Button';
import FormError from '@/components/form/FormError';
import FormInput from '@/components/form/FormInput';
import InlineError from '@/components/common/InlineError';
import InlineMessage from '@/components/common/InlineMessage';
import { useAuthContext } from '@/contexts/AuthProvider';
import useDelete from '@/hooks/useDelete';
import useLogout from '@/hooks/useLogout';
import { useState } from 'react';
import useUpdate from '@/hooks/useUpdate';

const EditProfile = () => {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const {
		updateData,
		isLoading: updateLoading,
		message: updateMessage,
		error: updateError,
	} = useUpdate();
	const {
		deleteData,
		isLoading: deleteLoading,
		message: deleteMessage,
		error: deleteError,
	} = useDelete();
	const { logout } = useLogout();
	const { user } = useAuthContext();

	const handleSaveChanges = async () => {
		if (user && !updateLoading) {
			await updateData('users/user', {
				currentPassword,
				newPassword,
			});
		}
	};

	const handleDeleteAccount = async () => {
		if (user && !deleteLoading) {
			await deleteData('users/user');
			logout();
		}
	};

	return (
		<div className='card-container-fit'>
			<h2 className='h-[68px] flex items-center'>Edit profile</h2>
			<FormInput
				icon={PiLockSimpleFill}
				placeholder='Current Password'
				type='password'
				name='currentPassword'
				value={currentPassword}
				onChangeAction={(e) => setCurrentPassword(e.target.value)}
			/>
			<FormInput
				icon={PiLockSimpleFill}
				placeholder='New Password'
				type='password'
				name='newPassword'
				value={newPassword}
				onChangeAction={(e) => setNewPassword(e.target.value)}
			/>
			<div className='flex gap-6'>
				<Button
					label='Save Changes'
					icon={PiCheckBold}
					color='primary'
					size='small'
					onClickAction={handleSaveChanges}
				/>
				<Button
					label='Delete Account'
					color='secondary'
					size='small'
					onClickAction={handleDeleteAccount}
				/>
			</div>
			{deleteError && <InlineError error={deleteError} />}
			{updateError && <FormError error={updateError} />}
			{updateMessage && <InlineMessage message={updateMessage} />}
		</div>
	);
};

export default EditProfile;
