import { PiChatCenteredFill, PiPlusBold } from 'react-icons/pi';

import Button from '../Button';
import Link from 'next/link';
import { PiSwordFill } from 'react-icons/pi';
import { PiUserFill } from 'react-icons/pi';

const FriendCard = ({ username }) => {
	return (
		<div className='bg-green-400 w-full p-6 rounded'>
			<div className='flex items-center space-x-6 mb-6'>
				<div className='bg-green-100 p-4 rounded w-fit'>
					<PiUserFill style={{ fontSize: '32px' }} />
				</div>
				<Link href={`/profile/${username}`}>
					<p>{username}</p>
				</Link>
			</div>
			<div className='flex space-x-6'>
				<Button
					label='Challenge'
					icon={PiSwordFill}
					color='secondary'
					size='small'
				/>
				<Button icon={PiChatCenteredFill} color='secondary' size='small' />
			</div>
		</div>
	);
};

export default FriendCard;
