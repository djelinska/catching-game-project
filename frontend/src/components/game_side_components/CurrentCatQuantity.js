import { PiCatFill } from 'react-icons/pi';

const CurrentCatQuantity = ({ currentQuantity, totalQuantity }) => {
	const current = parseInt(currentQuantity);
	const total = parseInt(totalQuantity);

	return (
		<div className='flex items-center space-x-4 text-lg'>
			<PiCatFill style={{ fontSize: '48px' }} />
			<div className='flex items-center space-x-4 text-nowrap text-right'>
				<p className='min-w-14'>{current}</p>
				<span>/</span>
				<p className='min-w-14'>{total}</p>
			</div>
		</div>
	);
};

export default CurrentCatQuantity;
