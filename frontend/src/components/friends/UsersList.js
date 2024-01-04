import FriendCard from '@/components/friends/FriendCard';

const UsersList = ({ users }) => {
	return (
		<div className='grid grid-cols-3 gap-6'>
			{users.map((user, index) => (
				<FriendCard key={index} username={user.username} />
			))}
		</div>
	);
};

export default UsersList;
