'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const GameContext = createContext();
export const useGame = () => useContext(GameContext);

const GameProvider = ({ children }) => {
	const [gameOptions, setGameOptions] = useState({
		step: 0,
		quantity: null,
		speed: null,
	});
	const [countdown, setCountdown] = useState(3);
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [isGameEnded, setIsGameEnded] = useState(false);
	const [gameboardOverlay, setGameboardOverlay] = useState(false);
	const [catTilePosition, setCatTilePosition] = useState(null);
	const [collectedCats, setCollectedCats] = useState(0);

	useEffect(() => {
		if (gameOptions.step === 3) {
			setGameboardOverlay(true);
			gameCountdown();
		}
	}, [gameOptions.step]);

	function getNewGame() {
		setGameOptions({ step: 1, quantity: null, speed: null });
		setIsGameStarted(false);
		setIsGameEnded(false);
		setCollectedCats(0);
	}

	function setGameQuantity(quantity) {
		setGameOptions((prevOptions) => ({
			...prevOptions,
			step: 2,
			quantity: quantity,
		}));
	}

	function setGameSpeed(speed) {
		setGameOptions((prevOptions) => ({
			...prevOptions,
			step: 3,
			speed: speed,
		}));
	}

	function setGameOptionsStep(step) {
		if (step === 0) {
			setGameOptions((prevOptions) => ({
				...prevOptions,
				quantity: null,
			}));
		}
		if (step === 1) {
			setGameOptions((prevOptions) => ({
				...prevOptions,
				speed: null,
			}));
		}
		setGameOptions((prevOptions) => ({
			...prevOptions,
			step: step < 0 ? 0 : step,
		}));
	}

	function gameCountdown() {
		setCountdown(3);

		const countdownInterval = setInterval(() => {
			setCountdown((prevCountdown) => {
				if (prevCountdown === 1) {
					clearInterval(countdownInterval);
					setIsGameStarted(true);
					setGameboardOverlay(false);
					startGame();
				} else {
					return prevCountdown - 1;
				}
			});
		}, 1000);
	}

	function startGame() {
		let catQuantity = gameOptions.quantity;

		const interval = setInterval(() => {
			const randomPosition = Math.floor(Math.random() * 64);
			setCatTilePosition(randomPosition);
			catQuantity--;

			if (catQuantity === 0) {
				clearInterval(interval);
				setTimeout(() => {
					setIsGameStarted(false);
					setIsGameEnded(true);
					setCatTilePosition(null);
				}, 1000);
			}
		}, 1000);
	}

	return (
		<GameContext.Provider
			value={{
				getNewGame,
				gameOptions,
				setGameQuantity,
				setGameSpeed,
				setGameOptionsStep,
				countdown,
				gameboardOverlay,
				isGameStarted,
				catTilePosition,
				collectedCats,
				setCollectedCats,
				isGameEnded,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
