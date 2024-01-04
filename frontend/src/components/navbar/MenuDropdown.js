import Link from 'next/link';

const MenuDropdown = ({ visibleDropdown }) => {
	return (
		<>
			{visibleDropdown && (
				<div className='menu-dropdown absolute top-20 right-0 z-10'>
					<Link href='/profile'>Profile</Link>
					<Link href='/edit-profile'>Edit Profile</Link>
					<button className='uppercase text-left'>Log out</button>
				</div>
			)}
		</>
	);
};

export default MenuDropdown;
