import React, { useEffect, useState } from 'react';
import './styles/style.scss';
import { motion, AnimatePresence } from 'framer-motion';

const Constansts = {
  LEFT: 37,
  TOP: 38,
  RIGHT: 39,
  BOTTOM: 40,
  TOTAL_PIXELS: 40,
  SQURE_OF_PIXELS: Math.pow(40, 2),
};

const defaultState = {
  snakeLength: 1000,
  foodPosition: 1,
  pixelList: [],
  snakeDirection: Constansts.RIGHT,
  snakeHeadPosition: Constansts.SQURE_OF_PIXELS / 2,
};

const SnakeGame = () => {
  let movementInterval = null;
  const [gameState, setGameState] = useState(defaultState);
  let [score, setScore] = useState(0);
  const [inteval, setMovementInterval] = useState(null);

  // Method to construct the food pixel
  const constructFood = () => {
    gameState.pixelList[gameState.foodPosition].classList.remove('food');
    let position = Math.random();
    gameState.foodPosition = Math.floor(Constansts.SQURE_OF_PIXELS * position);
    setGameState(gameState);
    gameState.pixelList[gameState.foodPosition].classList.add('food');
  };

  // Snake movement
  const moveSnake = () => {
    switch (gameState.snakeDirection) {
      case Constansts.RIGHT:
        gameState.snakeHeadPosition = ++gameState.snakeHeadPosition;
        setGameState(gameState);
        const isHeadReachedToRight =
          gameState.snakeHeadPosition % Constansts.TOTAL_PIXELS === 0;
        if (isHeadReachedToRight) {
          gameState.snakeHeadPosition =
            gameState.snakeHeadPosition - Constansts.TOTAL_PIXELS;
        }
        setGameState(gameState);
        break;
      case Constansts.LEFT:
        gameState.snakeHeadPosition = --gameState.snakeHeadPosition;
        setGameState(gameState);
        const isHeadReachedToLeft =
          gameState.snakeHeadPosition % Constansts.TOTAL_PIXELS ===
            Constansts.TOTAL_PIXELS - 1 || gameState.snakeHeadPosition < 0;
        if (isHeadReachedToLeft) {
          gameState.snakeHeadPosition =
            gameState.snakeHeadPosition + Constansts.TOTAL_PIXELS;
        }
        setGameState(gameState);
        break;
      case Constansts.TOP:
        gameState.snakeHeadPosition =
          gameState.snakeHeadPosition - Constansts.TOTAL_PIXELS;
        setGameState(gameState);
        const isHeadReachedToTop = gameState.snakeHeadPosition < 0;
        if (isHeadReachedToTop) {
          gameState.snakeHeadPosition =
            gameState.snakeHeadPosition + Constansts.SQURE_OF_PIXELS;
        }
        setGameState(gameState);
        break;
      case Constansts.BOTTOM:
        gameState.snakeHeadPosition =
          gameState.snakeHeadPosition + Constansts.TOTAL_PIXELS;
        setGameState(gameState);
        const isHeadReachedToBottom =
          gameState.snakeHeadPosition > Constansts.SQURE_OF_PIXELS - 1;
        if (isHeadReachedToBottom) {
          gameState.snakeHeadPosition =
            gameState.snakeHeadPosition - Constansts.SQURE_OF_PIXELS;
        }
        setGameState(gameState);
        break;
      default:
        break;
    }

    let snakeNextHeadPosition =
      gameState.pixelList[gameState.snakeHeadPosition];

    // Kill the snake if it eat byitseld
    if (snakeNextHeadPosition.classList.contains('snakeBodyPixel')) {
      clearInterval(inteval);
      if (!alert(`Your Score ${score}.`)) resetGame();
    }

    snakeNextHeadPosition.classList.add('snakeBodyPixel');

    // Remove the snake pixel time once it reaches to the end of the length
    setTimeout(
      () => snakeNextHeadPosition.classList.remove('snakeBodyPixel'),
      gameState.snakeLength
    );

    // Re-create tht food if snake eats it and update the score
    if (gameState.foodPosition === gameState.snakeHeadPosition) {
      setScore(++score);
      gameState.snakeLength = gameState.snakeLength + 100;
      setGameState(gameState);
      constructFood();
    }
  };

  const resetGame = () => {
    setGameState(defaultState);
    getPixels();
    constructFood();
    setScore(0);
    // setMovementInterval(setInterval(moveSnake, 80));
  };

  // Method to get all the constructed pixels
  const getPixels = () => {
    let pixels = document.getElementsByClassName('game-board-pixels');
    gameState.pixelList = pixels;
    setGameState(gameState);
  };

  // Method to construct the pixel into the game baord
  const constructGamePixels = () => {
    const gameContainer = document.getElementById('gameContainer');
    for (let i = 1; i <= Constansts.SQURE_OF_PIXELS; ++i) {
      gameContainer.innerHTML = `${gameContainer.innerHTML} <div key="pixels-${i}" class="game-board-pixels" id="pixels-${i}">`;
    }
  };

  // Listen to the key press event to change the snake movement/direction
  const changeDirection = (newDirection) => {
    if (newDirection === gameState.snakeDirection) return;
    if (
      newDirection === Constansts.LEFT &&
      gameState.snakeDirection !== Constansts.RIGHT
    ) {
      gameState.snakeDirection = newDirection;
      setGameState(gameState);
    } else if (
      newDirection === Constansts.RIGHT &&
      gameState.snakeDirection !== Constansts.LEFT
    ) {
      gameState.snakeDirection = newDirection;
      setGameState(gameState);
    } else if (
      newDirection === Constansts.TOP &&
      gameState.snakeDirection !== Constansts.BOTTOM
    ) {
      gameState.snakeDirection = newDirection;
      setGameState(gameState);
    } else if (
      newDirection === Constansts.BOTTOM &&
      gameState.snakeDirection !== Constansts.TOP
    ) {
      gameState.snakeDirection = newDirection;
      setGameState(gameState);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', (e) => changeDirection(e.keyCode));
    constructGamePixels();
    getPixels();
    constructFood();
    setMovementInterval(setInterval(moveSnake, 80));
  }, []);

  return (
    <main>
      <div className='score'>
        <div>
          <AnimatePresence>
            <motion.h1
              key={score}
              initial={{ y: -40, opacity: 0.5, scale: 0.3 }}
              animate={{ y: 1, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0.5, scale: 0.2 }}
              transition={{ duration: 0.5 }}
              className='score-head'
              style={{ position: 'absolute' }}
            >
              {score}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>
      {/* <button onClick={() => setScore(++score)}>Increase</button> */}
      <div id='gameContainer' className='game-board'></div>
    </main>
  );
};

export default SnakeGame;
