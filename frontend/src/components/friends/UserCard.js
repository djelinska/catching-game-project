'use client';

import Button from '../common/Button';
import { PiPlusBold } from 'react-icons/pi';
import UsernameDisplay from '../common/UsernameDisplay';
import { useAuthContext } from '../../context/AuthProviver';
import { useNavigate } from 'react-router-dom';
import useUpdate from '../../hooks/useUpdate';

const UserCard = ({ userObject }) => {
	const { updateData, isLoading, message, error } = useUpdate();
	const { user } = useAuthContext();
	const navigate = useNavigate();

	const handleSendFriendRequest = async (userId) => {
		if (user && !isLoading) {
			await updateData('users/friends/request/send', { userId: userId });
			navigate('/friends');
		}
	};

	return (
		<div className='bg-green-400 w-full p-6 rounded'>
			<UsernameDisplay
				username={userObject.username}
				iconBackground={true}
				size='large'
				profilePath={true}
			/>
			<div className='w-full mt-6'>
				<Button
					label='Add As Friend'
					icon={PiPlusBold}
					color='secondary'
					size='small'
					additionalStyles='w-full'
					onClickAction={() => handleSendFriendRequest(userObject._id)}
				/>
			</div>
		</div>
	);
};

export default UserCard;
