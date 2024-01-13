import {
	PiArrowsHorizontalFill,
	PiCatFill,
	PiShuffleAngularFill,
	PiTrendDownFill,
} from 'react-icons/pi';

import Button from '../common/Button';
import ChallengeGameChoice from '../notifications/ChallengeGameChoice';

const ChallengeRequestMessage = ({
	isFriendMessage,
	challQuantity,
	challSpeed,
}) => {
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
			} bg-green-400 rounded px-6 py-4 max-w-lg flex flex-col gap-6`}
		>
			<div className='flex space-x-6 justify-center'>
				<ChallengeGameChoice icon={PiCatFill} quantity={challQuantity} />
				<ChallengeGameChoice icon={SpeedIconComponent} speed={challSpeed} />
			</div>
			<div className='flex space-x-6 justify-center'>
				{isFriendMessage ? (
					<>
						<Button label='Accept' color='primary' size='small' />
						<Button label='Delete' color='secondary' size='small' />
					</>
				) : (
					<Button label='Cancel Challenge' color='secondary' size='small' />
				)}
			</div>
		</div>
	);
};

export default ChallengeRequestMessage;
