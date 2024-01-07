'use client';

import { useEffect, useState } from 'react';

import CatTile from './CatTile';
import Tile from './Tile';
import { useGame } from '../GameProvider';

const GameBoard = () => {
	const { countdown, gameboardOverlay, catTilePosition } = useGame();

	return (
		<div className='aspect-1 grid grid-cols-8 grid-rows-8 gap-2 mr-6 relative'>
			{gameboardOverlay && (
				<div className='bg-green-500 opacity-75 absolute top-0 w-full h-full rounded-sm flex justify-center items-center'>
					<p className='text-xl'>{countdown}</p>
				</div>
			)}
			{[...Array(64)].map((tile, index) =>
				index === catTilePosition ? (
					<CatTile key={index} />
				) : (
					<Tile key={index} />
				)
			)}
		</div>
	);
};

export default GameBoard;
