import { PiArrowFatLeftFill, PiXBold } from 'react-icons/pi';

import Button from '../Button';
import CurrentCatQuantity from './CurrentCatQuantity';
import CurrentCatSpeed from './CurrentCatSpeed';
import { useGameInfo } from '../GameProvider';

const GameTopNav = () => {
	const { state, stepBack } = useGameInfo();

	return (
		<div className='w-full h-[68px] absolute top-0 left-0 px-6 flex items-center justify-between space-x-6'>
			{/* <Link href='/register'>
				<Button label='Register' color='secondary' size='small' />
			</Link>
			<Link href='/login'>
				<Button label='Login' color='secondary' size='small' />
			</Link> */}
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
		</div>
	);
};

export default GameTopNav;
