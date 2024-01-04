import CatTile from './CatTile';
import Tile from './Tile';

const GameBoard = () => {
	const tilesNumber = 63;

	return (
		<div className='aspect-1 grid grid-cols-8 grid-rows-8 gap-2 mr-6'>
			<CatTile />
			{[...Array(tilesNumber)].map((tile, index) => (
				<Tile key={index} />
			))}
		</div>
	);
};

export default GameBoard;
