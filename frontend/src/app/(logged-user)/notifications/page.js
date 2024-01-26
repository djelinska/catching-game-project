'use client';

import { useEffect, useState } from 'react';

import ChallengeRequestNotification from '@/components/notifications/ChallengeRequestNotification';
import ChallengeResultNotification from '@/components/notifications/ChallengeResultNotification';
import FriendRequest from '@/components/notifications/FriendRequest';
import InlineError from '@/components/common/InlineError';
import LoadingMessage from '@/components/common/LoadingMessage';
import { useAuthContext } from '@/contexts/AuthProvider';
import useFetch from '@/hooks/useFetch';

const Notifications = () => {
	const [notifications, setNotifications] = useState(null);
	const { fetchData, isLoading, error } = useFetch();
	const { user } = useAuthContext();

	const getNotifications = async () => {
		const notifications = await fetchData('users/notifications');
		setNotifications(notifications);
	};

	useEffect(() => {
		if (user && !isLoading) {
			getNotifications();
		}
	}, []);

	return (
		<div className='card-container'>
			<h2 className='h-[68px] flex items-center'>Notifications</h2>
			{isLoading && <LoadingMessage message='Ładowanie powiadomień...' />}
			{error && <InlineError error={error} />}
			{notifications && (
				<div className='flex flex-col space-y-4 max-h-[660px] overflow-y-scroll'>
					{notifications.map((notif) =>
						notif.notification_type === 'friend_request' ? (
							<FriendRequest key={notif._id} notificationObject={notif} />
						) : notif.category === 'challenge_request' ? (
							<ChallengeRequestNotification key={notif._id} />
						) : (
							<ChallengeResultNotification key={notif._id} win={true} />
						)
					)}
				</div>
			)}
		</div>
	);
};

export default Notifications;
