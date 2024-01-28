import { PiPenFill, PiTrashFill } from 'react-icons/pi';

import UsernameDisplay from '../common/UsernameDisplay';

const UserMessage = ({ message, onEdit }) => {
	return (
		<div className='grow items-end flex flex-col space-y-4 mr-2'>
			<div className='flex items-center gap-4'>
				<UsernameDisplay
					username={message.receiver_username}
					iconBackground={true}
					size='small'
					reversed={true}
					profilePath={true}
				/>
				<button onClick={onEdit}>
					<PiPenFill />
				</button>
				<button>
					<PiTrashFill />
				</button>
			</div>
			<div className='shadow-card bg-green-400 rounded px-6 py-4 max-w-lg'>
				<p className='text-sm'>{message.content}</p>
			</div>
		</div>
	);
};

export default UserMessage;
