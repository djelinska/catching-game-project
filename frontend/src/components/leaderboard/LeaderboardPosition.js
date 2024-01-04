import { PiUserFill } from 'react-icons/pi';

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
			<div className='flex items-center space-x-6'>
				<div className='bg-green-100 p-2 rounded-sm'>
					<PiUserFill style={{ fontSize: '20px' }} />
				</div>
				<p>{username}</p>
			</div>
			<p className='text-center'>{playCount}</p>
			<p className='text-center text-yellow-light'>{totalScore}</p>
			<p className='text-center'>{constTotal}</p>
			<p className='text-center'>{decTotal}</p>
			<p className='text-center'>{randTotal}</p>
		</div>
	);
};

export default LeaderboardPosition;
