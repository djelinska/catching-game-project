import Link from 'next/link';
import useLogout from '../form/useLogout';

const MenuDropdown = ({ visibleDropdown }) => {
	const { logout } = useLogout();

	return (
		<>
			{visibleDropdown && (
				<div className='menu-dropdown absolute top-20 right-0 z-10 text-nowrap whitespace-nowrap'>
					<Link href={`/profile/${'myusername'}`}>Profile</Link>
					<Link href='/edit-profile'>Edit Profile</Link>
					<button className='uppercase text-left' onClick={logout}>
						Log out
					</button>
				</div>
			)}
		</>
	);
};

export default MenuDropdown;
