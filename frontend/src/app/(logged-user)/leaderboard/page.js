import LeaderboardPosition from '@/components/leaderboard/LeaderboardPosition';
import UserStatsLabels from '@/components/UserStatsLabels';

const Leaderboard = () => {
	const leaderboardUsers = [
		{
			username: 'username',
			playCount: 0,
			totalScore: 0,
			constTotal: 0,
			decTotal: 0,
			randTotal: 0,
		},
		{
			username: 'myusername',
			playCount: 0,
			totalScore: 0,
			constTotal: 0,
			decTotal: 0,
			randTotal: 0,
		},
		{
			username: 'username',
			playCount: 0,
			totalScore: 0,
			constTotal: 0,
			decTotal: 0,
			randTotal: 0,
		},
		{
			username: 'username',
			playCount: 0,
			totalScore: 0,
			constTotal: 0,
			decTotal: 0,
			randTotal: 0,
		},
		{
			username: 'username',
			playCount: 0,
			totalScore: 0,
			constTotal: 0,
			decTotal: 0,
			randTotal: 0,
		},
	];

	const currentUserIndex = leaderboardUsers.findIndex(
		(user) => user.username === 'myusername'
	);

	const currentUser = {
		...(currentUserIndex !== -1 ? leaderboardUsers[currentUserIndex] : {}),
		position: currentUserIndex !== -1 ? currentUserIndex + 1 : null,
	};

	return (
		<div className='bg-green-500 flex-col space-y-6 p-6 rounded shadow-card w-full max-w-screen-xl h-full max-h-[824px]'>
			<h2 className='h-[68px] flex items-center'>Leaderboard</h2>
			<div className='leaderboard-grid pl-6 pr-11'>
				<UserStatsLabels leaderboard={true} />
			</div>
			<div className='flex flex-col space-y-2 max-h-[442px] overflow-y-scroll'>
				{leaderboardUsers.map((user, index) => (
					<LeaderboardPosition
						key={index}
						position={index + 1}
						username={user.username}
						playCount={user.playCount}
						totalScore={user.totalScore}
						constTotal={user.constTotal}
						decTotal={user.decTotal}
						randTotal={user.randTotal}
					/>
				))}
			</div>
			<h3>Your Position</h3>
			{currentUser && (
				<LeaderboardPosition
					position={currentUser.position}
					username={currentUser.username}
					playCount={currentUser.playCount}
					totalScore={currentUser.totalScore}
					constTotal={currentUser.constTotal}
					decTotal={currentUser.decTotal}
					randTotal={currentUser.randTotal}
				/>
			)}
		</div>
	);
};

export default Leaderboard;
