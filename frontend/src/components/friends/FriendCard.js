import { PiChatCenteredFill, PiSwordFill, PiXBold } from 'react-icons/pi';

import Button from '../common/Button';
import { Link } from 'react-router-dom';
import UsernameDisplay from '../common/UsernameDisplay';
import { useAuthContext } from '../../context/AuthProviver';
import useUpdate from '../../hooks/useUpdate';

const FriendCard = ({ userObject, afterDelete }) => {
	const { updateData, isLoading, message, error } = useUpdate();
	const { user } = useAuthContext();

	const handleDeleteFriend = async (userId) => {
		if (user) {
			if (!isLoading) {
				await updateData('users/friends/delete', { userId: userId });
				afterDelete();
			}
		}
	};

	return (
		<div className='bg-green-400 w-full p-6 rounded'>
			<div className='w-full flex items-center justify-between gap-2'>
				<UsernameDisplay username={userObject.username} iconBackground={true} size='large' profilePath={true} />
				{userObject.status === 'accepted' && <Button icon={PiXBold} color='secondary' size='small' onClickAction={() => handleDeleteFriend(userObject.user_id)} />}
			</div>
			{userObject.status === 'accepted' && (
				<div className='flex gap-6 justify-center mt-6'>
					<Link to={`/game/challenge?userId=${userObject.user_id}`}>
						<Button label='Challenge' icon={PiSwordFill} color='secondary' size='small' />
					</Link>
					<Link to={`/chat?userId=${userObject.user_id}`}>
						<Button icon={PiChatCenteredFill} color='secondary' size='small' />
					</Link>
				</div>
			)}
			{userObject.status === 'pending' && <div className=' uppercase mt-6'>Pending Friend Request</div>}
		</div>
	);
};

export default FriendCard;
