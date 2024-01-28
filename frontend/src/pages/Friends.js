import { useEffect, useState } from 'react';

import Button from '../components/common/Button';
import FriendsList from '../components/friends/FriendsList';
import InlineError from '../components/common/InlineError';
import { Link } from 'react-router-dom';
import LoadingMessage from '../components/common/LoadingMessage';
import { PiPlusBold } from 'react-icons/pi';
import { useAuthContext } from '../context/AuthProviver';
import useFetch from '../hooks/useFetch';

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
	}, [user]);

	return (
		<div className='card-container'>
			<div className='flex items-center justify-between gap-6'>
				<h2>Friends</h2>
				<Link to='/friends/add'>
					<Button
						label='Add Friends'
						icon={PiPlusBold}
						color='primary'
						size='small'
					/>
				</Link>
			</div>
			{isLoading && <LoadingMessage />}
			{error && <InlineError error={error} />}
			{friends && friends.length > 0 && (
				<div className='max-h-[684px] overflow-y-scroll'>
					<FriendsList users={friends} afterDelete={getFriends} />
				</div>
			)}
		</div>
	);
};

export default Friends;
