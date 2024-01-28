import { PiArrowClockwiseFill, PiArrowFatLeftFill } from 'react-icons/pi';

import Button from '../components/common/Button';
import ChallengeEndMessage from '../components/game/ChallengeEndMessage';
import CurrentCatQuantity from '../components/game/CurrentCatQuantity';
import CurrentCatSpeed from '../components/game/CurrentCatSpeed';
import GameBoard from '../components/gameboard/GameBoard';
import GameChoiceQuantity from '../components/game/GameChoiceQuantity';
import GameChoiceSpeed from '../components/game/GameChoiceSpeed';
import GameEndMessage from '../components/game/GameEndMessage';
import Hearts from '../components/game/Hearts';
import TotalScore from '../components/game/TotalScore';
import { useEffect } from 'react';
import { useGameInfo } from '../context/GameProvider';
import { useLocation } from 'react-router-dom';

const Game = () => {
	const {
		state,
		stepBack,
		getNewGame,
		setChallenge,
		setCatQuantity,
		setCatSpeed,
	} = useGameInfo();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === '/game/challenge') {
			getNewGame();
			setChallenge('send');
		}

		if (location.pathname === '/game/accept/challenge') {
			getNewGame();
			setChallenge('accept');
			const searchParams = new URLSearchParams(location.search);
			const quantity = searchParams.get('quantity');
			const speed = searchParams.get('speed');

			setCatQuantity(parseInt(quantity));
			setCatSpeed(speed);
		}
	}, [location.pathname]);

	return (
		<div className='bg-green-500 flex space-x-6 p-6 mt-[112px] rounded shadow-card w-full max-w-screen-2xl h-full max-h-[810px]'>
			<GameBoard />
			<div className='game-side-container'>
				<div className='game-top-navbar'>
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
				<TotalScore />
				<div className='w-full flex flex-col grow justify-center items-center gap-12'>
					{state.gameOptionsStep === 1 && <GameChoiceQuantity />}
					{state.gameOptionsStep === 2 && <GameChoiceSpeed />}
					{state.gameOptionsStep === 3 && <Hearts />}
					{state.isGameEnded && !state.isChallenge && (
						<>
							<GameEndMessage />
							<Button
								label='Play Again'
								icon={PiArrowClockwiseFill}
								color='primary'
								size='large'
								onClickAction={() => {
									if (!state.isGameStarted) {
										getNewGame();
									}
								}}
							/>
						</>
					)}
					{state.isGameEnded && state.isChallenge && (
						<>
							<ChallengeEndMessage />
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Game;
