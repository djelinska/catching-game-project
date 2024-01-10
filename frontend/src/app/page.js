'use client';

import { PiArrowClockwiseFill, PiPlayFill } from 'react-icons/pi';

import Button from '@/components/Button';
import GameBoard from '@/components/gameboard/GameBoard';
import GameChoiceQuantity from '@/components/game-options/GameChoiceQuantity';
import GameChoiceSpeed from '@/components/game-options/GameChoiceSpeed';
import GameEndMessage from '@/components/game-options/GameEndMessage';
import GameTopNav from '@/components/game-options/GameTopNav';
import Hearts from '@/components/game-options/Hearts';
import Logo from '@/components/game-options/Logo';
import Navbar from '@/components/navbar/Navbar';
import TotalScore from '@/components/game-options/TotalScore';
import { useGameInfo } from '@/components/GameProvider';

export default function Home() {
	const { state, getNewGame } = useGameInfo();

	return (
		<div className='main-wrapper'>
			<div className='bg-green-500 flex space-x-6 p-6 rounded shadow-card w-full max-w-screen-2xl h-full max-h-[824px]'>
				<GameBoard />
				<div className='right-side-game-container'>
					<GameTopNav />
					<TotalScore />
					{state.gameOptionsStep === 0 && (
						<Button
							label='Start Game'
							icon={PiPlayFill}
							color='primary'
							size='large'
							onClickAction={() => {
								if (!state.isGameStarted) {
									getNewGame();
								}
							}}
						/>
					)}
					{state.gameOptionsStep === 1 && <GameChoiceQuantity />}
					{state.gameOptionsStep === 2 && <GameChoiceSpeed />}
					{state.gameOptionsStep === 3 && <Hearts />}
					{state.isGameEnded && (
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
					<Logo />
				</div>
			</div>
		</div>
	);
}
