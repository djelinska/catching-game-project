import Button from '../Button';
import ChallengeGameChoice from './ChallengeGameChoice';
import { PiArrowsHorizontalFill } from 'react-icons/pi';
import { PiCatFill } from 'react-icons/pi';
import { PiShuffleSimpleFill } from 'react-icons/pi';
import { PiTrendDownFill } from 'react-icons/pi';
import UsernameDisplay from '../UsernameDisplay';

const ChallengeResultNotification = ({ win }) => {
	return (
		<div className='bg-green-400 rounded p-6 flex flex-col items-center space-y-6 mr-2'>
			<div className='flex items-center space-x-6'>
				<ChallengeGameChoice icon={PiCatFill} quantity={15} />
				<ChallengeGameChoice icon={PiArrowsHorizontalFill} speed='const' />
			</div>
			<div className='flex items-center space-x-6'>
				<p>You {win ? 'won' : 'lost'} the challenge with</p>
				<UsernameDisplay username={'user'} size='large' />
			</div>
		</div>
	);
};

export default ChallengeResultNotification;
