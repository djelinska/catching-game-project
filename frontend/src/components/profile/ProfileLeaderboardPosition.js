import { PiMedalMilitaryFill } from 'react-icons/pi';

const ProfileLeaderboardPosition = () => {
	const userRankPosition = 6;

	return (
		<div className='flex items-center gap-6'>
			<PiMedalMilitaryFill />
			<p className='text-xs'>Leaderboard</p>
			<p>
				#<span className='text-lg'>{userRankPosition}</span>
			</p>
		</div>
	);
};

export default ProfileLeaderboardPosition;
