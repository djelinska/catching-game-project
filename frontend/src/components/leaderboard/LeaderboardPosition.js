import UsernameDisplay from '../common/UsernameDisplay';

const LeaderboardPosition = ({
	position,
	username,
	playCount,
	totalScore,
	constTotal,
	decTotal,
	randTotal,
}) => {
	return (
		<div className='leaderboard-grid bg-green-400 px-6 py-4 rounded-sm mr-2'>
			<p className='text-center'>#{position}</p>
			<UsernameDisplay
				username={username}
				iconBackground={true}
				size='small'
				profilePath={true}
			/>
			<p className='text-center'>{playCount}</p>
			<p className='text-center text-yellow-light'>{totalScore}</p>
			<p className='text-center'>{constTotal}</p>
			<p className='text-center'>{decTotal}</p>
			<p className='text-center'>{randTotal}</p>
		</div>
	);
};

export default LeaderboardPosition;
