'use client';

import { createContext, useContext, useEffect, useReducer } from 'react';

import { usePathname } from 'next/navigation';

const GameContext = createContext();
export const useGameInfo = () => useContext(GameContext);

const initialGameState = {
	isNewGame: false,
	gameOptionsStep: 0,
	gameOptions: { quantity: null, speed: null },
	isGameStarted: false,
	isGamePaused: false,
	currentIteration: 0,
	collectedCats: 0,
	hearts: 3,
	isGameEnded: false,
	isWin: null,
};

function gameReducer(state, action) {
	switch (action.type) {
		case 'RESET_STATE':
			return initialGameState;
		case 'GET_NEW_GAME':
			console.log('Nowa gra');
			return {
				...state,
				isNewGame: true,
				gameOptionsStep: 1,
			};
		case 'SET_CAT_QUANTITY':
			console.log('Ustawiono ilosc', action.quantity);
			return {
				...state,
				gameOptions: { ...state.gameOptions, quantity: action.quantity },
				gameOptionsStep: 2,
			};
		case 'SET_CAT_SPEED':
			console.log('Ustawiono predkosc', action.speed);
			return {
				...state,
				gameOptions: { ...state.gameOptions, speed: action.speed },
				gameOptionsStep: 3,
				isGameStarted: true,
			};
		case 'STEP_BACK':
			return {
				...state,
				gameOptionsStep: state.gameOptionsStep - 1,
			};
		case 'SET_CURRENT_ITERATION':
			return {
				...state,
				currentIteration: state.currentIteration + 1,
			};
		case 'SET_HEARTS':
			return {
				...state,
				hearts: 3 - action.missedCatTiles,
			};
		case 'CAT_COLLECTED':
			return {
				...state,
				collectedCats: state.collectedCats + 1,
			};
		case 'GAME_END':
			return {
				...state,
				isGameStarted: false,
				isGameEnded: true,
			};
		case 'CHECK_WIN':
			return {
				...state,
				isWin: action.win,
			};
		default:
			return state;
	}
}

const GameProvider = ({ children }) => {
	const [state, dispatch] = useReducer(gameReducer, initialGameState);
	const pathname = usePathname();

	useEffect(() => {
		if (pathname !== '/') {
			dispatch({ type: 'RESET_STATE' });
		}
	}, [pathname]);

	function getNewGame() {
		dispatch({ type: 'RESET_STATE' });
		dispatch({ type: 'GET_NEW_GAME' });
	}

	function setCatQuantity(quantity) {
		dispatch({ type: 'SET_CAT_QUANTITY', quantity: quantity });
	}

	function setCatSpeed(speed) {
		dispatch({ type: 'SET_CAT_SPEED', speed: speed });
	}

	function stepBack() {
		dispatch({ type: 'STEP_BACK' });
	}

	function setCurrentIteration() {
		dispatch({ type: 'SET_CURRENT_ITERATION' });
	}

	function setHearts(missedCatTiles) {
		dispatch({ type: 'SET_HEARTS', missedCatTiles: missedCatTiles });
	}

	function catCollected() {
		dispatch({ type: 'CAT_COLLECTED' });
	}

	function gameEnd() {
		dispatch({ type: 'GAME_END' });
	}

	function checkWin(win) {
		dispatch({ type: 'CHECK_WIN', win: win });
	}

	return (
		<GameContext.Provider
			value={{
				state,
				getNewGame,
				setCatQuantity,
				setCatSpeed,
				stepBack,
				setCurrentIteration,
				setHearts,
				catCollected,
				gameEnd,
				checkWin,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
