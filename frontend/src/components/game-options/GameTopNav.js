import Button from '../Button';
import CurrentCatQuantity from './CurrentCatQuantity';
import CurrentCatSpeed from './CurrentCatSpeed';
import { PiArrowFatLeftFill } from 'react-icons/pi';
import { useGame } from '../GameProvider';

const GameTopNav = () => {
	const { gameOptions, setGameOptionsStep, collectedCats } = useGame();

	function handleBack() {
		setGameOptionsStep(gameOptions.step - 1);
	}

	return (
		<div className='w-full h-[68px] absolute top-0 left-0 px-6 flex items-center justify-between space-x-6'>
			{/* <Link href='/register'>
				<Button label='Register' color='secondary' size='small' />
			</Link>
			<Link href='/login'>
				<Button label='Login' color='secondary' size='small' />
			</Link> */}
			{gameOptions.step === 2 && (
				<Button
					icon={PiArrowFatLeftFill}
					color='primary'
					size='small'
					fontSize='base'
					onClickAction={handleBack}
				/>
			)}
			{gameOptions.step === 3 && (
				<>
					<CurrentCatQuantity
						currentQuantity={collectedCats}
						totalQuantity={gameOptions.quantity}
					/>
					<CurrentCatSpeed speed={gameOptions.speed} />
				</>
			)}
		</div>
	);
};

export default GameTopNav;
