import FriendCard from './FriendCard';

const FriendsList = ({ users, afterDelete }) => {
	return (
		<div className='grid grid-cols-3 gap-6 mr-2'>
			{users.map((user) => (
				<FriendCard
					key={user._id}
					userObject={user}
					afterDelete={afterDelete}
				/>
			))}
		</div>
	);
};

export default FriendsList;
