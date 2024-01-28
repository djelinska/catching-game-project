import { useEffect, useState } from 'react';

import LeaderboardPosition from '../components/leaderboard/LeaderboardPosition';
import UserStatsLabels from '../components/leaderboard/UserStatsLabels';
import { useAuthContext } from '../context/AuthProviver';
import useFetch from '../hooks/useFetch';

const LeaderBoard = () => {
	const [leaderboard, setLeaderboard] = useState();
	const { fetchData, isLoading, error } = useFetch();
	const { user } = useAuthContext();
	const [loggedUser, setLoggedUser] = useState(null);

	const getLeaderboard = async () => {
		const leaderboard = await fetchData('users/game/leaderboard');

		const loggedUserIndex = leaderboard.findIndex(
			(u) => u.username === user.username
		);

		const loggedUser = {
			...(loggedUserIndex !== -1 ? leaderboard[loggedUserIndex] : {}),
			position: loggedUserIndex !== -1 ? loggedUserIndex + 1 : null,
		};

		setLeaderboard(leaderboard);
		setLoggedUser(loggedUser);
	};

	useEffect(() => {
		if (user && !isLoading) {
			getLeaderboard();
		}
	}, [user]);

	return (
		<div className='card-container'>
			<h2 className='h-[68px] flex items-center'>Leaderboard</h2>
			<div className='leaderboard-grid pl-6 pr-11'>
				<UserStatsLabels leaderboard={true} />
			</div>
			{leaderboard && (
				<div className='flex flex-col space-y-2 max-h-[442px] overflow-y-scroll'>
					{leaderboard.map((user, index) => (
						<LeaderboardPosition
							key={index}
							position={index + 1}
							username={user.username}
							playCount={user.stats.play_count}
							totalScore={user.stats.total_score}
							constTotal={user.stats.const_speed_total_score}
							decTotal={user.stats.dec_speed_total_score}
							randTotal={user.stats.rand_speed_total_score}
						/>
					))}
				</div>
			)}
			<h3>Your Position</h3>
			{loggedUser && (
				<LeaderboardPosition
					position={loggedUser.position}
					username={loggedUser.username}
					playCount={loggedUser.play_count}
					totalScore={loggedUser.stats.total_score}
					constTotal={loggedUser.stats.const_speed_total_score}
					decTotal={loggedUser.stats.dec_speed_total_score}
					randTotal={loggedUser.stats.rand_speed_total_score}
				/>
			)}
		</div>
	);
};

export default LeaderBoard;
