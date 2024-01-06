import Button from '../Button';
import ChallengeGameChoice from './ChallengeGameChoice';
import { PiArrowsHorizontalFill } from 'react-icons/pi';
import { PiCatFill } from 'react-icons/pi';
import { PiShuffleSimpleFill } from 'react-icons/pi';
import { PiTrendDownFill } from 'react-icons/pi';
import UsernameDisplay from '../UsernameDisplay';

const ChallengeRequestNotification = () => {
	return (
		<div className='bg-green-400 rounded p-6 flex items-center justify-center gap-6 mr-2'>
			<div className='flex items-center space-x-6'>
				<UsernameDisplay username={'user'} size='large' />
				<p>challenges you</p>
			</div>
			<div className='flex items-center space-x-6'>
				<ChallengeGameChoice icon={PiCatFill} quantity={15} />
				<ChallengeGameChoice icon={PiArrowsHorizontalFill} speed='const' />
				<Button label='Accept' color='primary' size='small' />
				<Button label='Delete' color='secondary' size='small' />
			</div>
		</div>
	);
};

export default ChallengeRequestNotification;
