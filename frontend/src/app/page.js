import Button from '@/components/Button';
import GameBoard from '@/components/GameBoard';
import GameChoiceQuantity from '@/components/game_side_components/GameChoiceQuantity';
import GameChoiceSpeed from '@/components/game_side_components/GameChoiceSpeed';
import GameTopNav from '@/components/game_side_components/GameTopNav';
import Hearts from '@/components/game_side_components/Hearts';
import Logo from '@/components/game_side_components/Logo';
import MissedCatTile from '@/components/game_side_components/MissedCatTile';
import Navbar from '@/components/Navbar';
import { PiPlayFill } from 'react-icons/pi';
import TotalScore from '@/components/game_side_components/TotalScore';

export default function Home() {
	return (
		<div className='main-container'>
			<Navbar />
			<div className='inside-container w-full h-full max-w-screen-2xl'>
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
					{/* <Hearts heartsLeft='1' />
					<MissedCatTile /> */}
					<GameChoiceQuantity />
					{/* <GameChoiceSpeed /> */}
					<Logo />
				</div>
			</div>
		</div>
	);
}
