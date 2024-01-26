import { PiChatCenteredFill, PiSwordFill, PiXBold } from 'react-icons/pi';

import Button from '../common/Button';
import UsernameDisplay from '../common/UsernameDisplay';
import { useAuthContext } from '@/contexts/AuthProvider';
import useUpdate from '@/hooks/useUpdate';

const FriendCard = ({ userObject }) => {
	const { updateData, isLoading, message, error } = useUpdate();
	const { user } = useAuthContext();

	const handleDeleteFriend = async (userId) => {
		if (user && !isLoading) {
			await updateData('users/friends/delete', { userId: userId });
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
			{userObject.status === 'accepted' && (
				<div className='flex flex-wrap gap-6 justify-center mt-6'>
					<Button
						label='Challenge'
						icon={PiSwordFill}
						color='primary'
						size='small'
					/>
					<Button icon={PiChatCenteredFill} color='primary' size='small' />
					<Button
						label='Delete friend'
						icon={PiXBold}
						color='secondary'
						size='small'
						onClickAction={() => handleDeleteFriend(userObject.user_id)}
					/>
				</div>
			)}
			{userObject.status === 'pending' && (
				<div className='uppercase mt-6'>Pending Friend Request</div>
			)}
		</div>
	);
};

export default FriendCard;
