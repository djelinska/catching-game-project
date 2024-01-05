import ChallengeRequest from '@/components/notifications/ChallengeRequest';
import ChallengeResult from '@/components/notifications/ChallengeResult';
import FriendRequest from '@/components/notifications/FriendRequest';

const Notifications = () => {
	return (
		<div className='max-w-screen-xl card-container'>
			<h2 className='h-[68px] flex items-center'>Notifications</h2>
			<div className='flex flex-col space-y-4 max-h-[660px] overflow-y-scroll'>
				<FriendRequest />
				<ChallengeRequest />
				<ChallengeResult win={true} />
			</div>
		</div>
	);
};

export default Notifications;
