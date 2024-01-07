'use client';

import {
	PiArrowClockwiseBold,
	PiArrowClockwiseFill,
	PiPlayFill,
} from 'react-icons/pi';

import Button from '@/components/Button';
import GameBoard from '@/components/gameboard/GameBoard';
import GameChoiceQuantity from '@/components/game-options/GameChoiceQuantity';
import GameChoiceSpeed from '@/components/game-options/GameChoiceSpeed';
import GameTopNav from '@/components/game-options/GameTopNav';
import Hearts from '@/components/game-options/Hearts';
import Logo from '@/components/game-options/Logo';
import MissedCatTile from '@/components/game-options/MissedCatTile';
import Navbar from '@/components/navbar/Navbar';
import TotalScore from '@/components/game-options/TotalScore';
import { useGame } from '@/components/GameProvider';
import { useState } from 'react';

export default function Home() {
	const { getNewGame, gameOptions, isGameStarted, isGameEnded } = useGame();

	return (
		<div className='main-wrapper'>
			<div className='bg-green-500 flex space-x-6 p-6 rounded shadow-card w-full max-w-screen-2xl h-full max-h-[824px]'>
				<GameBoard />
				<div className='right-side-game-container'>
					<GameTopNav />
					<TotalScore />
					{gameOptions.step === 0 && (
						<Button
							label='Start Game'
							icon={PiPlayFill}
							color='primary'
							size='large'
							onClickAction={() => {
								if (!isGameStarted) {
									getNewGame();
								}
							}}
						/>
					)}
					{gameOptions.step === 1 && <GameChoiceQuantity />}
					{gameOptions.step === 2 && <GameChoiceSpeed />}
					{gameOptions.step === 3 && <Hearts heartsLeft={3} />}
					{/* <MissedCatTile /> */}
					{isGameEnded && (
						<Button
							label='Play Again'
							icon={PiArrowClockwiseFill}
							color='primary'
							size='large'
							onClickAction={() => {
								if (!isGameStarted) {
									getNewGame();
								}
							}}
						/>
					)}
					<Logo />
				</div>
			</div>
		</div>
	);
}
