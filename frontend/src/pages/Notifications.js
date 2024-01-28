import { useEffect, useState } from 'react';

import ChallengeRequestNotification from '../components/notifications/ChallengeRequestNotification';
import ChallengeResultNotification from '../components/notifications/ChallengeResultNotification';
import FriendRequest from '../components/notifications/FriendRequest';
import InlineError from '../components/common/InlineError';
import LoadingMessage from '../components/common/LoadingMessage';
import { useAuthContext } from '../context/AuthProviver';
import useFetch from '../hooks/useFetch';

const Notifications = () => {
	const [notifications, setNotifications] = useState(null);
	const { fetchData, isLoading, error } = useFetch();
	const { user } = useAuthContext();

	const getNotifications = async () => {
		const notifications = await fetchData('users/notifications');
		setNotifications(notifications);
	};

	useEffect(() => {
		console.log('ok pobieram');
		if (user && !isLoading) {
			getNotifications();
		}
	}, [user]);

	return (
		<div className='card-container'>
			<h2 className='h-[68px] flex items-center'>Notifications</h2>
			{isLoading && <LoadingMessage />}
			{error && <InlineError error={error} />}
			{notifications && notifications.length > 0 && (
				<div className='flex flex-col space-y-4 max-h-[660px] overflow-y-scroll'>
					{notifications.map((notification) =>
						notification.type === 'friendRequest' ? (
							<FriendRequest
								key={notification._id}
								notificationObject={notification}
								afterAction={getNotifications}
							/>
						) : notification.type === 'challengeRequest' ? (
							<ChallengeRequestNotification
								key={notification._id}
								notificationObject={notification}
								afterAction={getNotifications}
							/>
						) : (
							<ChallengeResultNotification
								key={notification._id}
								win={true}
								notificationObject={notification}
							/>
						)
					)}
				</div>
			)}
		</div>
	);
};

export default Notifications;
