const UserStatsLabels = ({ labels, leaderboard = false }) => {
	return (
		<>
			<h3
				className={`game-stats-label ${
					leaderboard ? 'col-start-3' : 'col-start-0'
				}`}
			>
				Play Count
			</h3>
			{leaderboard && (
				<h3 className='game-stats-label text-yellow-light'>Total Score</h3>
			)}
			<h3 className='game-stats-label'>Const Speed Total Score</h3>
			<h3 className='game-stats-label'>Dec Speed Total Score</h3>
			<h3 className='game-stats-label'>Rand Speed Total Score</h3>
			{!leaderboard && (
				<>
					<h3 className='game-stats-label'>Accepted Challenges</h3>
					<h3 className='game-stats-label'>Players Challenged</h3>
				</>
			)}
		</>
	);
};

export default UserStatsLabels;
