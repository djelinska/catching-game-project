import Button from '../common/Button';
import UsernameDisplay from '../common/UsernameDisplay';
import { useAuthContext } from '@/contexts/AuthProvider';
import useUpdate from '@/hooks/useUpdate';

const FriendRequest = ({ notificationObject }) => {
	const { updateData, isLoading, message, error } = useUpdate();
	const { user } = useAuthContext();

	const handleAcceptFriendRequest = async (notificationId, userId) => {
		if (user && !isLoading) {
			await updateData('users/request/friend/accept', {
				notificationId: notificationId,
				userId: userId,
			});
		}
	};

	const handleRejectFriendRequest = async (notificationId, userId) => {
		if (user && !isLoading) {
			await updateData('users/request/friend/reject', {
				notificationId: notificationId,
				userId: userId,
			});
		}
	};

	return (
		<div className='bg-green-400 rounded p-6 flex items-center justify-center space-x-6 mr-2'>
			<UsernameDisplay username={notificationObject.username} size='large' />
			<p>wants to be your friend</p>
			<Button
				label='Accept'
				color='primary'
				size='small'
				onClickAction={() =>
					handleAcceptFriendRequest(
						notificationObject._id,
						notificationObject.user_id
					)
				}
			/>
			<Button
				label='Delete'
				color='secondary'
				size='small'
				onClickAction={() =>
					handleRejectFriendRequest(
						notificationObject._id,
						notificationObject.user_id
					)
				}
			/>
		</div>
	);
};

export default FriendRequest;
