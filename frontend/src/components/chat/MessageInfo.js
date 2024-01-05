import { PiUserFill } from 'react-icons/pi';

const MessageInfo = ({ isFriendMessage, username, time }) => {
	return (
		<div
			className={`flex items-center gap-6 ${
				isFriendMessage ? 'flex-row' : 'flex-row-reverse'
			}`}
		>
			<div className='bg-green-100 p-2 rounded-sm'>
				<PiUserFill style={{ fontSize: '20px' }} />
			</div>
			<p>{username}</p>
			<span className='text-xs'>{time}</span>
		</div>
	);
};

export default MessageInfo;
