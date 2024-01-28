import { PiArrowsHorizontalFill } from 'react-icons/pi';
import { PiShuffleSimpleFill } from 'react-icons/pi';
import { PiTrendDownFill } from 'react-icons/pi';
import { useGameInfo } from '../../context/GameProvider';

const CurrentCatSpeed = () => {
	const { state } = useGameInfo();

	return (
		<div className='flex items-center space-x-4 text-lg'>
			{state.gameOptions.speed === 'const' ? (
				<PiArrowsHorizontalFill style={{ fontSize: '48px' }} />
			) : state.gameOptions.speed === 'dec' ? (
				<PiTrendDownFill style={{ fontSize: '48px' }} />
			) : (
				<PiShuffleSimpleFill style={{ fontSize: '48px' }} />
			)}
			<p>{state.gameOptions.speed}</p>
		</div>
	);
};

export default CurrentCatSpeed;
