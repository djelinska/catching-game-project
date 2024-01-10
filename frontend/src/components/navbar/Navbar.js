'use client';

import Button from '../Button';
import IconButton from '../IconButton';
import Link from 'next/link';
import MenuDropdown from './MenuDropdown';
import NavbarLinks from './NavbarLinks';
import { PiPlayFill } from 'react-icons/pi';
import { PiSquaresFourFill } from 'react-icons/pi';
import { useGameInfo } from '../GameProvider';
import { useState } from 'react';

const Navbar = () => {
	const [visibleDropdown, setVisibleDropdown] = useState(false);
	const { state, getNewGame } = useGameInfo();

	function displayMenuDropdown() {
		setVisibleDropdown((prevVisibleDropdown) => !prevVisibleDropdown);
	}

	return (
		<nav className='w-full bg-green-500 flex items-center justify-between space-x-6 px-32 py-6 shadow-card'>
			<Link href='/'>
				<Button
					label='New Game'
					icon={PiPlayFill}
					color='primary'
					size='small'
					onClickAction={() => {
						if (!state.isGameStarted) {
							getNewGame();
						}
					}}
				/>
			</Link>
			<div className='flex justify-end space-x-6 w-full'>
				<NavbarLinks />
				<div
					className='menu-wrapper bg-green-400 rounded relative'
					onClick={displayMenuDropdown}
				>
					<IconButton icon={PiSquaresFourFill} />
					<MenuDropdown visibleDropdown={visibleDropdown} />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
