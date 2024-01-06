import ChallengeRequestNotification from '@/components/notifications/ChallengeRequestNotification';
import ChallengeResultNotification from '@/components/notifications/ChallengeResultNotification';
import FriendRequest from '@/components/notifications/FriendRequest';

const Notifications = () => {
	return (
		<div className='card-container'>
			<h2 className='h-[68px] flex items-center'>Notifications</h2>
			<div className='flex flex-col space-y-4 max-h-[660px] overflow-y-scroll'>
				<FriendRequest />
				<ChallengeRequestNotification />
				<ChallengeResultNotification win={true} />
			</div>
		</div>
	);
};

export default Notifications;
