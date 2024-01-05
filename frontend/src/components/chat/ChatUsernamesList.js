import { PiUserFill } from 'react-icons/pi';

const ChatUsernamesList = ({ startedChatsUsernames }) => {
	return (
		<div className='flex flex-col gap-6'>
			{startedChatsUsernames.map((chatUsername, index) => (
				<div key={index} className='bg-green-400 p-4 rounded'>
					<div className='flex items-center space-x-6'>
						<div className='bg-green-100 p-4 rounded w-fit'>
							<PiUserFill style={{ fontSize: '32px' }} />
						</div>
						<span>{chatUsername}</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default ChatUsernamesList;
