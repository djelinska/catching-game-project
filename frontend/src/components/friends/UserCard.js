import { PiChatCenteredFill, PiPlusBold } from 'react-icons/pi';

import Button from '../Button';
import Link from 'next/link';
import { PiSwordFill } from 'react-icons/pi';
import { PiUserFill } from 'react-icons/pi';
import UsernameDisplay from '../UsernameDisplay';

const UserCard = ({ username }) => {
	return (
		<div className='bg-green-400 w-full p-6 rounded'>
			<UsernameDisplay
				username={username}
				iconBackground={true}
				size='large'
				profilePath={true}
			/>
			<div className='flex space-x-6 mt-6'>
				<Button
					label='Challenge'
					icon={PiSwordFill}
					color='secondary'
					size='small'
				/>
				<Button icon={PiChatCenteredFill} color='secondary' size='small' />
			</div>
			{/* <Button
				label='Add As Friend'
				icon={PiPlusBold}
				color='secondary'
				size='small'
			/> */}
		</div>
	);
};

export default UserCard;
