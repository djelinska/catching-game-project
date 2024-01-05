import {
	PiArrowsHorizontalFill,
	PiCatFill,
	PiShuffleAngularFill,
	PiTrendDownFill,
} from 'react-icons/pi';

import ChallengeGameChoice from '../notifications/ChallengeGameChoice';

const ChallengeResultMessage = ({
	isFriendMessage,
	challQuantity,
	challSpeed,
	challengeWin,
	challScore,
	challBonus,
}) => {
	const challTotalScore = (challScore + challBonus) * 2;

	const SpeedIconComponent =
		challSpeed === 'const'
			? PiArrowsHorizontalFill
			: challSpeed === 'dec'
			? PiTrendDownFill
			: PiShuffleAngularFill;

	return (
		<div
			className={`${
				isFriendMessage ? 'border-3 border-green-300' : 'shadow-card'
			} bg-green-400 rounded px-6 py-4 max-w-lg flex flex-col items-center gap-6`}
		>
			<div className='flex space-x-6 justify-center'>
				<ChallengeGameChoice icon={PiCatFill} quantity={challQuantity} />
				<ChallengeGameChoice icon={SpeedIconComponent} speed={challSpeed} />
			</div>
			<p>You {challengeWin ? 'won!' : 'lost'}</p>
			{challengeWin && (
				<div className='grid grid-cols-3 gap-4 text-center items-center'>
					<p className='text-sm'>
						Challenge Score <br />+{challScore}
					</p>
					<p className='text-sm'>
						Challenge Bonus <br />+{challBonus}
					</p>
					<p>
						Total Score <br />+{challTotalScore}
					</p>
				</div>
			)}
		</div>
	);
};

export default ChallengeResultMessage;
