import { Link, useLocation } from 'react-router-dom';
import {
	PiBellSimpleFill,
	PiChatCenteredFill,
	PiTrophyFill,
	PiUserFill,
	PiUsersFill,
} from 'react-icons/pi';
import { useEffect, useState } from 'react';

import Button from '../common/Button';
import IconButton from '../common/IconButton';
import Logo from '../common/Logo';
import Menu from './Menu';
import mqtt from 'mqtt';
import { useAuthContext } from '../../context/AuthProviver';
import { useMQTTContext } from '../../context/MQTTProvider';

const Navbar = () => {
	const { user } = useAuthContext();
	const links = [
		{ icon: PiUsersFill, path: '/friends' },
		{ icon: PiTrophyFill, path: '/leaderboard' },
		{ icon: PiBellSimpleFill, path: '/notifications' },
	];
	const location = useLocation();
	const { currentTime } = useMQTTContext();

	return (
		<nav className='absolute top-0 p-6 w-full h-28 flex items-center gap-6 bg-green-500 shadow-card'>
			<Logo />
			<div className='text-lg'>{currentTime}</div>
			{!user ? (
				<>
					<Link to='/register'>
						<Button label='Register' color='secondary' size='small' />
					</Link>
					<Link to='/login'>
						<Button label='Login' color='secondary' size='small' />
					</Link>
				</>
			) : (
				<>
					{links.map((link) => (
						<Link
							key={link.path}
							to={link.path}
							className={`${
								location.pathname === link.path
									? 'bg-green-400 rounded'
									: 'bg-transparent'
							}`}
						>
							<IconButton icon={link.icon} />
						</Link>
					))}
					<div className='flex items-center gap-4'>
						<PiUserFill />
						<p>{user.username}</p>
					</div>
					<Menu />
				</>
			)}
		</nav>
	);
};

export default Navbar;
