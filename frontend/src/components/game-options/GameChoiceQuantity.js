import GameChoiceButton from './GameChoiceButton';
import { PiCatFill } from 'react-icons/pi';
import { useGame } from '../GameProvider';

const GameChoiceQuantity = () => {
	const quantities = [5, 15, 30, 45, 75, 99];
	const { setGameQuantity } = useGame();

	return (
		<div className='grid grid-cols-3 gap-6'>
			{quantities.map((quantity, index) => (
				<GameChoiceButton
					key={index}
					icon={PiCatFill}
					label={quantity}
					onClickAction={() => setGameQuantity(quantity)}
				/>
			))}
		</div>
	);
};

export default GameChoiceQuantity;
