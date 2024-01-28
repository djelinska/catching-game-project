import IconButton from '../common/IconButton';
import { Link } from 'react-router-dom';
import { PiSquaresFourFill } from 'react-icons/pi';
import { useAuthContext } from '../../context/AuthProviver';
import useLogout from '../../hooks/useLogout';
import { useState } from 'react';

const Menu = () => {
	const { user } = useAuthContext();
	const { logout } = useLogout();
	const [visibleDropdown, setVisibleDropdown] = useState(false);

	return (
		<div className='relative'>
			<div
				className='bg-green-400 rounded'
				onClick={() => setVisibleDropdown(!visibleDropdown)}
			>
				<IconButton icon={PiSquaresFourFill} />
			</div>
			{visibleDropdown && (
				<div className='menu-dropdown absolute top-20 right-0 z-10 text-nowrap whitespace-nowrap'>
					<Link to={`/profile/${user.username}`}>Profile</Link>
					<Link to='/edit'>Edit Profile</Link>
					<button className='uppercase text-left' onClick={logout}>
						Log out
					</button>
				</div>
			)}
		</div>
	);
};

export default Menu;
