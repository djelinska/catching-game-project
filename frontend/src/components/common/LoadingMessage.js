import { PiSpiralBold } from 'react-icons/pi';

const LoadingMessage = () => {
	return (
		<div className='flex items-center gap-4'>
			<PiSpiralBold className='text-base text-green-200' />
			<p className='text-sm text-green-200'>Loading...</p>
		</div>
	);
};

export default LoadingMessage;
