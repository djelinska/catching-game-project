import GameChoiceButton from './GameChoiceButton';
import { PiArrowsHorizontalFill } from 'react-icons/pi';
import { PiShuffleSimpleFill } from 'react-icons/pi';
import { PiTrendDownFill } from 'react-icons/pi';
import { useGameInfo } from '../GameProvider';

const GameChoiceSpeed = () => {
	const { setCatSpeed } = useGameInfo();

	return (
		<div className='grid grid-rows-3 gap-6'>
			<GameChoiceButton
				icon={PiArrowsHorizontalFill}
				label='Constant Speed'
				onClickAction={() => setCatSpeed('const')}
			/>
			<GameChoiceButton
				icon={PiTrendDownFill}
				label='Decreasing Speed'
				onClickAction={() => setCatSpeed('dec')}
			/>
			<GameChoiceButton
				icon={PiShuffleSimpleFill}
				label='Random Speed'
				onClickAction={() => setCatSpeed('rand')}
			/>
		</div>
	);
};

export default GameChoiceSpeed;
