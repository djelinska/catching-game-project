import Button from '../Button';
import UsernameDisplay from '../UsernameDisplay';

const FriendRequest = () => {
	return (
		<div className='bg-green-400 rounded p-6 flex items-center justify-center space-x-6 mr-2'>
			<UsernameDisplay username={'user'} size='large' />
			<p>wants to be your friend</p>
			<Button label='Accept' color='primary' size='small' />
			<Button label='Delete' color='secondary' size='small' />
		</div>
	);
};

export default FriendRequest;
