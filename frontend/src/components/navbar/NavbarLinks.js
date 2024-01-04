import IconButton from '../IconButton';
import Link from 'next/link';
import { PiBellSimpleFill } from 'react-icons/pi';
import { PiChatCenteredFill } from 'react-icons/pi';
import { PiTrophyFill } from 'react-icons/pi';
import { PiUsersFill } from 'react-icons/pi';
import { usePathname } from 'next/navigation';

const NavbarLinks = () => {
	const links = [
		{ icon: PiUsersFill, path: '/friends' },
		{ icon: PiTrophyFill, path: '/leaderboard' },
		{ icon: PiBellSimpleFill, path: '/notifications' },
		{ icon: PiChatCenteredFill, path: '/chat' },
	];

	const pathName = usePathname();

	return (
		<>
			{links.map((link) => (
				<Link
					key={link.path}
					href={link.path}
					className={`${
						pathName === link.path ? 'bg-green-400 rounded' : 'bg-transparent'
					}`}
				>
					<IconButton icon={link.icon} />
				</Link>
			))}
		</>
	);
};

export default NavbarLinks;
