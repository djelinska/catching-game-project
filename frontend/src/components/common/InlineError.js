import { PiXBold } from 'react-icons/pi';

const InlineError = ({ error }) => {
	return (
		<div className='flex items-center gap-4'>
			<PiXBold className='text-sm text-green-200' />
			<p className='text-sm text-green-200'>{error}</p>
		</div>
	);
};

export default InlineError;
