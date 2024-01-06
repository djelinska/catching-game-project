import { PiUserFill } from 'react-icons/pi';
import UsernameDisplay from '../UsernameDisplay';

const ChatUsernamesList = ({ startedChatsUsernames }) => {
	return (
		<div className='flex flex-col gap-6'>
			{startedChatsUsernames.map((chatUsername, index) => (
				<div key={index} className='bg-green-400 p-4 rounded'>
					<UsernameDisplay
						username={chatUsername}
						iconBackground={true}
						size='large'
					/>
				</div>
			))}
		</div>
	);
};

export default ChatUsernamesList;
