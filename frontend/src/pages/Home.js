import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Button from '../components/common/Button';
import { PiPlayFill } from 'react-icons/pi';
import TotalScore from '../components/game/TotalScore';
import { useGameInfo } from '../context/GameProvider';

const Home = () => {
	const { state, resetState, getNewGame } = useGameInfo();
	const location = useLocation();
	const navigate = useNavigate();
	const [ad, setAd] = useState(null);

	useEffect(() => {
		if (location.pathname === '/') {
			resetState();
		}
	}, [location.pathname]);

	useEffect(() => {
		const eventSource = new EventSource('http://localhost:3001/sse');

		eventSource.addEventListener('message', (event) => {
			const data = JSON.parse(event.data);
			setAd(data.number);
		});

		return () => {
			eventSource.close();
		};
	}, []);

	return (
		<div className='card-container-fit'>
			{ad !== null && (
				<div className='absolute top-36 left-6 bg-green-400 p-4 rounded-sm'>
					Ad number {ad}
				</div>
			)}
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
