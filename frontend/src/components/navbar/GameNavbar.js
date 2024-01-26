import { PiArrowFatLeftFill, PiXBold } from 'react-icons/pi';

import Button from '../common/Button';
import CurrentCatQuantity from '../game/CurrentCatQuantity';
import CurrentCatSpeed from '../game/CurrentCatSpeed';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthProvider';
import { useGameInfo } from '../../contexts/GameProvider';

const GameNavbar = () => {
	const { state, stepBack } = useGameInfo();
	const { user } = useAuthContext();

	return (
		<div className='w-full h-[68px] absolute top-0 left-0 px-6 flex items-center justify-between space-x-6'>
			{!user ? (
				<nav className='w-full flex justify-end gap-6'>
					<Link href='/register'>
						<Button label='Register' color='secondary' size='small' />
					</Link>
					<Link href='/login'>
						<Button label='Login' color='secondary' size='small' />
					</Link>
				</nav>
			) : (
				<>
					{state.gameOptionsStep === 2 && (
						<Button
							icon={PiArrowFatLeftFill}
							color='primary'
							size='small'
							onClickAction={stepBack}
						/>
					)}
					{state.gameOptionsStep === 3 && (
						<>
							<CurrentCatQuantity />
							<CurrentCatSpeed />
						</>
					)}
				</>
			)}
		</div>
	);
};

export default GameNavbar;
