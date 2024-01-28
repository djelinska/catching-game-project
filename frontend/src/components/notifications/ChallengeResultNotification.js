import Button from '../common/Button';
import ChallengeGameChoice from './ChallengeGameChoice';
import { PiArrowsHorizontalFill } from 'react-icons/pi';
import { PiCatFill } from 'react-icons/pi';
import { PiShuffleSimpleFill } from 'react-icons/pi';
import { PiTrendDownFill } from 'react-icons/pi';
import UsernameDisplay from '../common/UsernameDisplay';

const ChallengeResultNotification = ({ notificationObject }) => {
	const speed = notificationObject.challenge.speed;
	const challengeIcon =
		speed === 'const'
			? PiArrowsHorizontalFill
			: speed === 'dec'
			? PiTrendDownFill
			: PiShuffleSimpleFill;
	const result = notificationObject.challenge.result;

	return (
		<div className='bg-green-400 rounded p-6 flex items-center justify-center gap-6 mr-2'>
			<div className='flex items-center space-x-6'>
				<ChallengeGameChoice
					icon={PiCatFill}
					quantity={notificationObject.challenge.quantity}
				/>
				<ChallengeGameChoice icon={challengeIcon} speed={speed} />
			</div>
			<div className='flex items-center space-x-6'>
				{result === 'draw' ? (
					<p>It's a draw with</p>
				) : (
					<p>You {notificationObject.challenge.result} the challenge with</p>
				)}
				<UsernameDisplay
					username={notificationObject.sender_username}
					size='large'
				/>
			</div>
		</div>
	);
};

export default ChallengeResultNotification;
