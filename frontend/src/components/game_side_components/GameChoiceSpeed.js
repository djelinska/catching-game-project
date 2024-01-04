import GameChoiceButton from './GameChoiceButton';
import { PiArrowsHorizontalFill } from 'react-icons/pi';
import { PiShuffleSimpleFill } from 'react-icons/pi';
import { PiTrendDownFill } from 'react-icons/pi';

const GameChoiceSpeed = () => {
	return (
		<div className='grid grid-rows-3 gap-6'>
			<GameChoiceButton icon={PiArrowsHorizontalFill} label='Constant Speed' />
			<GameChoiceButton icon={PiTrendDownFill} label='Decreasing Speed' />
			<GameChoiceButton icon={PiShuffleSimpleFill} label='Random Speed' />
		</div>
	);
};

export default GameChoiceSpeed;
