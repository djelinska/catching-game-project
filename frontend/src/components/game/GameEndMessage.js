import { useGameInfo } from '../../contexts/GameProvider';

const GameEndMessage = () => {
	const { state } = useGameInfo();

	return (
		<>
			{state.isWin ? (
				<p className='text-center'>Congrats on collecting the cats!</p>
			) : (
				<p className='text-center'>Try again and collect the cats</p>
			)}
		</>
	);
};

export default GameEndMessage;
