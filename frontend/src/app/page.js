import Button from '@/components/Button';
import GameBoard from '@/components/gameboard/GameBoard';
import GameChoiceQuantity from '@/components/game-options/GameChoiceQuantity';
import GameChoiceSpeed from '@/components/game-options/GameChoiceSpeed';
import GameTopNav from '@/components/game-options/GameTopNav';
import Hearts from '@/components/game-options/Hearts';
import Logo from '@/components/game-options/Logo';
import MissedCatTile from '@/components/game-options/MissedCatTile';
import Navbar from '@/components/navbar/Navbar';
import { PiPlayFill } from 'react-icons/pi';
import TotalScore from '@/components/game-options/TotalScore';

export default function Home() {
	return (
		<div className='main-wrapper'>
			<div className='bg-green-500 flex space-x-6 p-6 rounded shadow-card w-full max-w-screen-2xl h-full max-h-[824px]'>
				<GameBoard />
				<div className='right-side-game-container'>
					<GameTopNav />
					<TotalScore />
					<Button
						label='Start Game'
						icon={PiPlayFill}
						color='primary'
						size='large'
					/>
					{/* <Hearts heartsLeft={0} />
					<MissedCatTile /> */}
					<GameChoiceQuantity />
					{/* <GameChoiceSpeed /> */}
					<Logo />
				</div>
			</div>
		</div>
	);
}
