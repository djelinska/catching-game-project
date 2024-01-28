import UserCard from './UserCard';

const UsersList = ({ users }) => {
	return (
		<div className='grid grid-cols-3 gap-6 mr-2'>
			{users.map((user) => (
				<UserCard key={user._id} userObject={user} />
			))}
		</div>
	);
};

export default UsersList;
