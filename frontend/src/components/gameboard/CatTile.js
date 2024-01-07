import { PiCatFill } from 'react-icons/pi';
import { useGame } from '../GameProvider';

const CatTile = () => {
	const { collectedCats, setCollectedCats } = useGame();

	return (
		<div
			onClick={() => setCollectedCats(collectedCats + 1)}
			className='rounded-sm bg-red-light shadow-xs cursor-pointer flex items-center justify-center max-w-[90px] aspect-1'
		>
			<PiCatFill style={{ fontSize: '40px' }} />
		</div>
	);
};

export default CatTile;
