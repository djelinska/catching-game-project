'use client';

import { useEffect, useState } from 'react';

import CatTile from './CatTile';
import Tile from './Tile';
import { useGameInfo } from '../GameProvider';

const GameBoard = () => {
	const { state, setCurrentIteration, setHearts, gameEnd, checkWin } =
		useGameInfo();
	const [catTilePosition, setCatTilePosition] = useState(null);
	const [decSpeedCurrentDuration, setDecSpeedCurrentDuration] = useState(5000);
	const [decSpeedDurationStep, setDecSpeedDurationStep] = useState(null);
	const TILES_NUMBER = 64;

	useEffect(() => {
		if (state.isGameStarted) {
			if (state.gameOptions.speed === 'dec') {
				setDecSpeedDurationStep(
					(decSpeedCurrentDuration - 500) / (state.gameOptions.quantity - 1)
				);
			}

			makeGameIteration(
				state.currentIteration,
				getDurationTime(state.gameOptions.speed),
				state.gameOptions.quantity,
				state.currentIteration - state.collectedCats
			);
		}
	}, [state.isGameStarted]);

	useEffect(() => {
		if (state.currentIteration > 0) {
			setHearts(state.currentIteration - 1 - state.collectedCats);
			setDecSpeedCurrentDuration(
				(prevDuration) => prevDuration - decSpeedDurationStep
			);

			if (
				state.currentIteration > state.gameOptions.quantity ||
				state.currentIteration - state.collectedCats > 3
			) {
				const win =
					state.currentIteration - state.collectedCats > 3 ? false : true;
				checkWin(win);
				setCatTilePosition(null);
				gameEnd();
				setDecSpeedCurrentDuration(5000);
				setDecSpeedDurationStep(null);
			} else {
				makeGameIteration(
					state.currentIteration,
					getDurationTime(state.gameOptions.speed),
					state.gameOptions.quantity,
					state.currentIteration - state.collectedCats
				);
			}
		}
	}, [state.currentIteration]);

	function makeGameIteration(iteration, duration, maxQuantity, missedHearts) {
		console.log(duration);
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
		<div className='aspect-1 grid grid-cols-8 grid-rows-8 gap-2 mr-6 relative'>
			{false && (
				<div className='bg-green-500 opacity-75 absolute top-0 w-full h-full rounded-sm flex justify-center items-center'>
					<p className='text-xl'>{countdown}</p>
				</div>
			)}
			{[...Array(TILES_NUMBER)].map((tile, index) =>
				index === catTilePosition ? (
					<CatTile key={index} />
				) : (
					<Tile key={index} />
				)
			)}
		</div>
	);
};

export default GameBoard;
