import UserCard from '@/components/friends/UserCard';

const UsersList = ({ users }) => {
	return (
		<div className='grid grid-cols-3 gap-6 mr-2'>
			{users.map((user, index) => (
				<UserCard key={index} username={user.username} />
			))}
		</div>
	);
};

export default UsersList;
