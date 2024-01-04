import { PiArrowsHorizontalFill } from 'react-icons/pi';
import { PiShuffleSimpleFill } from 'react-icons/pi';
import { PiTrendDownFill } from 'react-icons/pi';

const CurrentSpeedChoice = ({ speed }) => {
	return (
		<div className='flex items-center space-x-4 text-lg'>
			{speed === 'const' ? (
				<PiArrowsHorizontalFill style={{ fontSize: '48px' }} />
			) : speed === 'dec' ? (
				<PiTrendDownFill style={{ fontSize: '48px' }} />
			) : (
				<PiShuffleSimpleFill style={{ fontSize: '48px' }} />
			)}
			<p>{speed}</p>
		</div>
	);
};

export default CurrentSpeedChoice;
