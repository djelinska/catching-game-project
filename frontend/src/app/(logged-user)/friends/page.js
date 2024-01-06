import { PiMagnifyingGlassFill, PiPlusBold } from 'react-icons/pi';

import Button from '@/components/Button';
import FormInput from '@/components/FormInput';
import Link from 'next/link';
import UsersList from '@/components/friends/UsersList';

const Friends = () => {
	const friendUsers = [
		{
			username: 'username1',
			playCount: 0,
			totalScore: 0,
			constTotal: 0,
			decTotal: 0,
			randTotal: 0,
		},
		{
			username: 'username2',
			playCount: 0,
			totalScore: 0,
			constTotal: 0,
			decTotal: 0,
			randTotal: 0,
		},
		{
			username: 'username23',
			playCount: 0,
			totalScore: 0,
			constTotal: 0,
			decTotal: 0,
			randTotal: 0,
		},
		{
			username: 'username4',
			playCount: 0,
			totalScore: 0,
			constTotal: 0,
			decTotal: 0,
			randTotal: 0,
		},
	];

	return (
		<div className='card-container'>
			<div className='flex justify-between space-x-6'>
				<h2>Friends</h2>
				<Link href='/friends/add'>
					<Button
						label='Add Friends'
						icon={PiPlusBold}
						color='primary'
						size='small'
					/>
				</Link>
			</div>
			<div className='flex space-x-6'>
				<FormInput
					icon={PiMagnifyingGlassFill}
					placeholder='Search friend'
					type='text'
				/>
				<Button label='Search' color='secondary' size='large' />
			</div>
			<div className='max-h-[576px] overflow-y-scroll'>
				<UsersList users={friendUsers} />
			</div>
		</div>
	);
};

export default Friends;
