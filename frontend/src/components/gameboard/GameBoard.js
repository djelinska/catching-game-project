import { useEffect, useState } from 'react';
import { useLocation, useResolvedPath } from 'react-router-dom';

import CatTile from './CatTile';
import Tile from './Tile';
import { useGameInfo } from '../../context/GameProvider';
import usePost from '../../hooks/usePost';
import useUpdate from '../../hooks/useUpdate';

const GameBoard = () => {
	const { state, setCurrentIteration, setHearts, gameEnd, checkWin } = useGameInfo();
	const [catTilePosition, setCatTilePosition] = useState(null);
	const [decSpeedCurrentDuration, setDecSpeedCurrentDuration] = useState(5000);
	const [decSpeedDurationStep, setDecSpeedDurationStep] = useState(null);
	const TILES_NUMBER = 64;
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const userId = searchParams.get('userId');
	const { postData, isLoading: postLoading } = usePost();
	const { updateData, isLoading: updateLoading } = useUpdate();
	const [challengeAdded, setChallengeAdded] = useState(false);
	const [challengeChecked, setChallengeChecked] = useState(false);
	const [scoreRecorded, setScoreRecorded] = useState(false);

	const addChallenge = async (win) => {
		if (win && challengeAdded && !postLoading) {
			await postData('challenges', {
				opponentId: userId,
				speed: state.gameOptions.speed,
				quantity: state.gameOptions.quantity,
				senderScore: state.collectedCats,
			});

			setChallengeAdded(false);
		}
	};

	const recordGameScore = async (win) => {
		if (scoreRecorded && !updateLoading) {
			const score = win ? state.collectedCats : 0;

			await updateData('users/game/update', {
				score: score,
				gameType: `${state.gameOptions.speed}_speed_total_score`,
			});

			setScoreRecorded(false);
		}
	};

	const checkChallengeResult = async () => {
		const searchParams = new URLSearchParams(location.search);
		const notificationId = searchParams.get('notificationId');
		const challengeId = searchParams.get('challengeId');

		if (challengeChecked && !updateLoading) {
			await updateData('challenges/request/accept', {
				notificationId: notificationId,
				challengeId: challengeId,
				score: state.collectedCats,
			});

			setChallengeChecked(false);
		}
	};

	useEffect(() => {
		setChallengeAdded(true);
		setChallengeChecked(true);
		setScoreRecorded(true);
		if (state.isGameStarted) {
			if (state.gameOptions.speed === 'dec') {
				setDecSpeedDurationStep((decSpeedCurrentDuration - 500) / (state.gameOptions.quantity - 1));
			}

			makeGameIteration(state.currentIteration, getDurationTime(state.gameOptions.speed), state.gameOptions.quantity, state.currentIteration - state.collectedCats);
		}
	}, [state.isGameStarted]);

	useEffect(() => {
		if (state.currentIteration > 0) {
			setHearts(state.currentIteration - 1 - state.collectedCats);
			setDecSpeedCurrentDuration((prevDuration) => prevDuration - decSpeedDurationStep);

			if (state.currentIteration > state.gameOptions.quantity || state.currentIteration - state.collectedCats > 3) {
				const win = state.currentIteration - state.collectedCats > 3 ? false : true;
				checkWin(win);
				setCatTilePosition(null);
				gameEnd();
				setDecSpeedCurrentDuration(5000);
				setDecSpeedDurationStep(null);

				if (location.pathname === '/game/accept/challenge') {
					checkChallengeResult();
				} else if (location.pathname === '/game/challenge') {
					addChallenge(win);
				} else {
					recordGameScore(win);
				}
			} else {
				makeGameIteration(state.currentIteration, getDurationTime(state.gameOptions.speed), state.gameOptions.quantity, state.currentIteration - state.collectedCats);
			}
		}
	}, [state.currentIteration]);

	function makeGameIteration(iteration, duration, maxQuantity, missedHearts) {
		setTimeout(() => {
			setCurrentIteration();
			if (iteration >= maxQuantity || missedHearts > 3) {
				setCatTilePosition(null);
			} else {
				let randomPosition;

				do {
					randomPosition = Math.floor(Math.random() * TILES_NUMBER);
				} while (randomPosition === catTilePosition);

				setCatTilePosition(randomPosition);
			}
		}, duration);
	}

	function getDurationTime(speed) {
		switch (speed) {
			case 'const':
				return 1000;
			case 'dec':
				return decSpeedCurrentDuration;
			case 'rand':
				return Math.floor(Math.random() * 10) * 500 + 500;
			default:
				return 1000;
		}
	}

	return (
		<div className='w-full aspect-square grid grid-cols-8 grid-rows-8 gap-2 mr-6 relative'>
			{[...Array(TILES_NUMBER)].map((tile, index) => (index === catTilePosition ? <CatTile key={index} /> : <Tile key={index} />))}
		</div>
	);
};

export default GameBoard;
