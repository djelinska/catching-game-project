import { useEffect, useState } from 'react';

import { PiCatFill } from 'react-icons/pi';
import { useGameInfo } from '../GameProvider';

const CatTile = () => {
	const { state, catCollected } = useGameInfo();
	const [isCatTileClicked, setIsCatTileClicked] = useState(false);

	useEffect(() => {
		setIsCatTileClicked(false);
	}, [state.currentIteration]);

	return (
		<div
			onClick={() => {
				if (!isCatTileClicked) {
					setIsCatTileClicked(true);
					catCollected();
				}
			}}
			className='rounded-sm bg-red-light shadow-xs cursor-pointer flex items-center justify-center max-w-[90px] aspect-1'
		>
			<PiCatFill style={{ fontSize: '40px' }} />
		</div>
	);
};

export default CatTile;
