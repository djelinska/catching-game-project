import Button from '../common/Button';
import UsernameDisplay from '../common/UsernameDisplay';
import { useAuthContext } from '../../context/AuthProviver';
import useUpdate from '../../hooks/useUpdate';

const FriendRequest = ({ notificationObject, afterAction }) => {
	const { updateData, isLoading, message, error } = useUpdate();
	const { user } = useAuthContext();

	const handleAcceptFriendRequest = async (notificationId, userId) => {
		if (user && !isLoading) {
			await updateData('users/friends/request/accept', {
				notificationId: notificationId,
				userId: userId,
			});
			afterAction();
		}
	};

	const handleRejectFriendRequest = async (notificationId, userId) => {
		if (user && !isLoading) {
			await updateData('users/friends/request/reject', {
				notificationId: notificationId,
				userId: userId,
			});
			afterAction();
		}
	};

	return (
		<div className='bg-green-400 rounded p-6 flex items-center justify-center space-x-6 mr-2'>
			<UsernameDisplay
				username={notificationObject.sender_username}
				size='large'
			/>
			<p>wants to be your friend</p>
			<Button
				label='Accept'
				color='primary'
				size='small'
				onClickAction={() =>
					handleAcceptFriendRequest(
						notificationObject._id,
						notificationObject.sender_id
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
						notificationObject.sender_id
					)
				}
			/>
		</div>
	);
};

export default FriendRequest;
