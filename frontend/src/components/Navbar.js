import Button from './Button';
import IconButton from './IconButton';
import Link from 'next/link';
import { PiBellSimpleFill } from 'react-icons/pi';
import { PiChatCenteredFill } from 'react-icons/pi';
import { PiPlayFill } from 'react-icons/pi';
import { PiSquaresFourFill } from 'react-icons/pi';
import { PiTrophyFill } from 'react-icons/pi';
import { PiUsersFill } from 'react-icons/pi';

const Navbar = () => {
	return (
		<nav className='w-full bg-green-500 flex items-center justify-between space-x-6 px-32 py-6 shadow-card'>
			<Button label='New Game' icon={PiPlayFill} color='primary' size='small' />
			<div className='flex justify-end space-x-6 w-full'>
				<IconButton icon={PiUsersFill} />
				<IconButton icon={PiTrophyFill} />
				<IconButton icon={PiBellSimpleFill} />
				<IconButton icon={PiChatCenteredFill} />
				<div className='menu-wrapper bg-green-400 rounded relative'>
					<IconButton icon={PiSquaresFourFill} />
					<div className='menu-dropdown absolute top-20 right-0 z-10'>
						<Link href='/profile'>Profile</Link>
						<Link href='/edit-profile'>Edit Profile</Link>
						<button className='uppercase text-left'>Log out</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
