import { PiCheckFatFill } from 'react-icons/pi';

const InlineMessage = ({ message }) => {
	return (
		<div className='flex items-center gap-4'>
			<PiCheckFatFill className='text-sm text-green-200' />
			<p className='text-sm text-green-200'>{message}</p>
		</div>
	);
};

export default InlineMessage;
