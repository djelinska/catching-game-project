import { useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import io from 'socket.io-client';
import { useAuthContext } from '../../context/AuthProviver';
import { useGameInfo } from '../../context/GameProvider';

const TotalScore = () => {
	const { user } = useAuthContext();
	const [totalScore, setTotalScore] = useState(0);
	const { state } = useGameInfo();

	useEffect(() => {
		if (user) {
			const socket = io('http://localhost:3001');

			socket.on('connect', () => {
				socket.emit('getTotalScore', user.username);
			});

			socket.on('totalScore', (totalScore) => {
				setTotalScore(totalScore);
			});

			return () => {
				socket.disconnect();
			};
		}
	}, [user, state.isGameEnded]);

	return (
		<div className='text-center'>
			<h2>Total Score</h2>
			<p className='text-xl'>{totalScore}</p>
		</div>
	);
};

export default TotalScore;
