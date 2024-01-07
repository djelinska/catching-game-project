import { PiCatFill } from 'react-icons/pi';

const CurrentCatQuantity = ({ currentQuantity, totalQuantity }) => {
	return (
		<div className='flex items-center space-x-4 text-lg'>
			<PiCatFill style={{ fontSize: '48px' }} />
			<div className='flex items-center space-x-4 text-nowrap text-right'>
				<p className='min-w-14'>{currentQuantity}</p>
				<span>/</span>
				<p className='min-w-14'>{totalQuantity}</p>
			</div>
		</div>
	);
};

export default CurrentCatQuantity;
