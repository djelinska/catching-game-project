import { PiCatFill } from 'react-icons/pi';
import { useGameInfo } from '../GameProvider';

const CurrentCatQuantity = () => {
	const { state } = useGameInfo();

	return (
		<div className='flex items-center space-x-4 text-lg'>
			<PiCatFill style={{ fontSize: '48px' }} />
			<div className='flex items-center space-x-4 text-nowrap text-right'>
				<p className='min-w-14'>{state.collectedCats}</p>
				<span>/</span>
				<p className='min-w-14'>{state.gameOptions.quantity}</p>
			</div>
		</div>
	);
};

export default CurrentCatQuantity;
