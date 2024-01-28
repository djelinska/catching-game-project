import { useGameInfo } from '../../context/GameProvider';

const ChallengeEndMessage = () => {
	const { state } = useGameInfo();

	return (
		<>
			{state.isWin && state.challengeStatus === 'send' && (
				<p className='text-center'>Challenge request send!</p>
			)}

			{!state.isWin && state.challengeStatus === 'send' && (
				<p className='text-center'>Try again and challenge your friend</p>
			)}

			{state.challengeStatus === 'accept' && (
				<p className='text-center'>Check the result in the notifications</p>
			)}
		</>
	);
};

export default ChallengeEndMessage;
