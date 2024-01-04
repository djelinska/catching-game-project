import { PiCatFill } from 'react-icons/pi';

const CatTile = () => {
	return (
		<div className='rounded-sm bg-red-light shadow-xs cursor-pointer flex items-center justify-center'>
			<PiCatFill style={{ fontSize: '40px' }} />
		</div>
	);
};

export default CatTile;
