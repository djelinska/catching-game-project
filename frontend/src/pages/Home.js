import { Link, useLocation, useNavigate } from 'react-router-dom';

import Button from '../components/common/Button';
import { PiPlayFill } from 'react-icons/pi';
import TotalScore from '../components/game/TotalScore';
import { useEffect } from 'react';
import { useGameInfo } from '../context/GameProvider';

const Home = () => {
	const { state, resetState, getNewGame } = useGameInfo();
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname === '/') {
			resetState();
		}
	}, [location.pathname]);

	return (
		<div className='card-container-fit'>
			<TotalScore />
			{state.gameOptionsStep === 0 && (
				<Button
					label='Start Game'
					icon={PiPlayFill}
					color='primary'
					size='large'
					additionalStyles='mt-6'
					onClickAction={() => {
						if (!state.isGameStarted) {
							getNewGame();
							navigate('/game');
						}
					}}
				/>
			)}
		</div>
	);
};

export default Home;
