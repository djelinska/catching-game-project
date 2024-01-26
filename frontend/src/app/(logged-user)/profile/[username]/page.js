'use client';

import { PiMinusBold, PiPlusBold } from 'react-icons/pi';
import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import ProfileLeaderboardPosition from '@/components/profile/ProfileLeaderboardPosition';
import TotalScore from '@/components/game/TotalScore';
import UserStatsLabels from '@/components/common/UserStatsLabels';
import UsernameDisplay from '@/components/common/UsernameDisplay';
import { useAuthContext } from '@/contexts/AuthProvider';
import useFetch from '@/hooks/useFetch';

const Profile = ({ params }) => {
	const userGamesStats = {
		play_count: 2,
		total_score: 4,
		const_speed_total_score: 0,
		dec_speed_total_score: 4,
		rand_speed_total_score: 0,
	};

	const [profile, setProfile] = useState(null);
	const { fetchData, isLoading, error } = useFetch();
	const { user } = useAuthContext();

	const getUserProfile = async () => {
		const profile = await fetchData(`users/user/${params.username}`);
		setProfile(profile);
	};

	useEffect(() => {
		if (user && !isLoading) {
			getUserProfile();
		}
	}, [user]);

	const getMonthName = (monthNumber) => {
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		return months[monthNumber - 1];
	};

	return (
		<div className='card-container'>
			<h2 className='h-[68px] flex items-center'>Profile</h2>
			{profile && (
				<>
					<div className='bg-green-400 p-6 rounded flex flex-col gap-6 items-center'>
						<UsernameDisplay
							username={profile.username}
							iconBackground={true}
							size='large'
							date={`${getMonthName(profile.month)} ${profile.year}`}
						/>
						<TotalScore totalScore={profile.stats.total_score} />
					</div>
					<div className='grid grid-cols-6 gap-2'>
						<UserStatsLabels leaderboard={false} />
					</div>
					<div className='grid grid-cols-6 gap-2'>
						<p className='text-center'>{profile.stats.play_count}</p>
						<p className='text-center'>
							{profile.stats.const_speed_total_score}
						</p>
						<p className='text-center'>{profile.stats.dec_speed_total_score}</p>
						<p className='text-center'>
							{profile.stats.rand_speed_total_score}
						</p>
						<p className='text-center'>0</p>
						<p className='text-center'>0</p>
					</div>
				</>
			)}
		</div>
	);
};

export default Profile;
