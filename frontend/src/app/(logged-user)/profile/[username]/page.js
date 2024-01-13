import { PiPlusBold, PiUserFill, PiUsersFill } from 'react-icons/pi';

import Button from '@/components/common/Button';
import ProfileLeaderboardPosition from '@/components/profile/ProfileLeaderboardPosition';
import TotalScore from '@/components/game/TotalScore';
import UserStatsLabels from '@/components/common/UserStatsLabels';
import UsernameDisplay from '@/components/common/UsernameDisplay';

const Profile = ({ params }) => {
	const username = params.username;

	const userGamesStats = {
		playCount: 0,
		constSpeedScore: 0,
		decSpeedScore: 0,
		randSpeedScore: 0,
		acceptedChallenges: 0,
		playersChallenged: 0,
	};

	const joinDate = 'January 2024';

	return (
		<div className='card-container'>
			<h2 className='h-[68px] flex items-center'>Profile</h2>
			<div className='bg-green-400 p-6 rounded flex flex-col gap-6 items-center'>
				<UsernameDisplay
					username={username}
					iconBackground={true}
					size='large'
					date={joinDate}
				/>
				<TotalScore />
				<ProfileLeaderboardPosition />
				<Button
					label='Add As Friend'
					icon={PiPlusBold}
					color='primary'
					size='small'
				/>
				<Button
					label='Friends'
					icon={PiUsersFill}
					color='secondary'
					size='small'
				/>
			</div>
			<div className='grid grid-cols-6 gap-2'>
				<UserStatsLabels leaderboard={false} />
			</div>
			<div className='grid grid-cols-6 gap-2'>
				{Object.values(userGamesStats).map((value, index) => (
					<p key={index} className='text-center'>
						{value}
					</p>
				))}
			</div>
		</div>
	);
};

export default Profile;
