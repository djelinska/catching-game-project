import FriendCard from './FriendCard';

const FriendsList = ({ users }) => {
	return (
		<div className='grid grid-cols-3 gap-6 mr-2'>
			{users.map((user) => (
				<FriendCard key={user._id} userObject={user} />
			))}
		</div>
	);
};

export default FriendsList;
