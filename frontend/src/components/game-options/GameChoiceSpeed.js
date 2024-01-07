import GameChoiceButton from './GameChoiceButton';
import { PiArrowsHorizontalFill } from 'react-icons/pi';
import { PiShuffleSimpleFill } from 'react-icons/pi';
import { PiTrendDownFill } from 'react-icons/pi';
import { useGame } from '../GameProvider';

const GameChoiceSpeed = () => {
	const { setGameSpeed } = useGame();

	return (
		<div className='grid grid-rows-3 gap-6'>
			<GameChoiceButton
				icon={PiArrowsHorizontalFill}
				label='Constant Speed'
				onClickAction={() => setGameSpeed('const')}
			/>
			<GameChoiceButton
				icon={PiTrendDownFill}
				label='Decreasing Speed'
				onClickAction={() => setGameSpeed('dec')}
			/>
			<GameChoiceButton
				icon={PiShuffleSimpleFill}
				label='Random Speed'
				onClickAction={() => setGameSpeed('rand')}
			/>
		</div>
	);
};

export default GameChoiceSpeed;
