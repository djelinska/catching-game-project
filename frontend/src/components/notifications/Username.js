import { PiUserFill } from 'react-icons/pi';

const Username = ({ username }) => {
	return (
		<div className='flex items-center space-x-4'>
			<PiUserFill />
			<span>{username}</span>
		</div>
	);
};

export default Username;
