'use client';

import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import FriendsList from '@/components/friends/FriendsList';
import InlineError from '@/components/common/InlineError';
import Link from 'next/link';
import LoadingMessage from '@/components/common/LoadingMessage';
import { PiPlusBold } from 'react-icons/pi';
import { useAuthContext } from '@/contexts/AuthProvider';
import useFetch from '@/hooks/useFetch';

const Friends = () => {
	const [friends, setFriends] = useState(null);
	const { fetchData, isLoading, error } = useFetch();
	const { user } = useAuthContext();

	const getFriends = async () => {
		const friends = await fetchData('users/friends');
		setFriends(friends);
	};

	useEffect(() => {
		if (user && !isLoading) {
			getFriends();
		}
	}, []);

	return (
		<div className='card-container'>
			<div className='flex items-center justify-between space-x-6'>
				<h2>Friends</h2>
				<Link href='/friends/add'>
					<Button
						label='Add Friends'
						icon={PiPlusBold}
						color='primary'
						size='small'
					/>
				</Link>
			</div>
			{isLoading && <LoadingMessage message='Loading friends...' />}
			{error && <InlineError error={error} />}
			{friends && (
				<div className='max-h-[684px] overflow-y-scroll'>
					<FriendsList users={friends} />
				</div>
			)}
		</div>
	);
};

export default Friends;
