// GAME_PIXEL is the on horizontal and vertical axis of game container
const GAME_PIXEL = 40;
const SQURE_OF_GAME_PIXEL = Math.pow(GAME_PIXEL, 2);

let totalFoodAte = 0;

// Game container
const gameContainer = document.getElementById('gameContainer');

// The game board
const constructBoard = () => {
  for (let i = 1; i < SQURE_OF_GAME_PIXEL; ++i) {
    gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="game-board-pixel" id="pixel${i}"></div>`;
  }
};

// Create a food
const pixelList = document.getElementsByClassName('game-board-pixel');

let currentFoodPosition = 0;
const constructFood = () => {
  // Clearing exisitng food
  pixelList[currentFoodPosition].classList.remove('food');

  currentFoodPosition = Math.random();
  currentFoodPosition = Math.floor(currentFoodPosition * SQURE_OF_GAME_PIXEL);
  pixelList[currentFoodPosition].classList.add('food');
};

// The directions
const LEFT_DIR = 37;
const UP_DIR = 38;
const RIGHT_DIR = 39;
const DOWN_DIR = 40;

let currentSnakeDirection = RIGHT_DIR;

// Initial snake head position
let snakeHeadPosition = SQURE_OF_GAME_PIXEL / 2;

// Initial Snake length
let snakeLength = 1000;

const moveSnake = () => {
  switch (currentSnakeDirection) {
    case RIGHT_DIR:
      ++snakeHeadPosition;
      const isSnakeHeadIsAtTheRightCorner =
        snakeHeadPosition % GAME_PIXEL === 0;
      if (isSnakeHeadIsAtTheRightCorner)
        snakeHeadPosition = snakeHeadPosition - GAME_PIXEL;
      break;
    case LEFT_DIR:
      --snakeHeadPosition;
      const isSnakeHeadIsAtTheLeftCorner =
        snakeHeadPosition % GAME_PIXEL === GAME_PIXEL - 1 ||
        snakeHeadPosition < 0;
      if (isSnakeHeadIsAtTheLeftCorner)
        snakeHeadPosition = snakeHeadPosition + GAME_PIXEL;
      break;
    case UP_DIR:
      snakeHeadPosition = snakeHeadPosition - GAME_PIXEL;
      const isSnakeHeadIsAtTheTopCorner = snakeHeadPosition < 0;
      if (isSnakeHeadIsAtTheTopCorner)
        snakeHeadPosition = snakeHeadPosition + SQURE_OF_GAME_PIXEL;
      break;
    case DOWN_DIR:
      snakeHeadPosition = snakeHeadPosition + GAME_PIXEL;
      const isSnakeHeadIsAtTheBottomCorner =
        snakeHeadPosition > SQURE_OF_GAME_PIXEL - 1;
      if (isSnakeHeadIsAtTheBottomCorner)
        snakeHeadPosition = snakeHeadPosition - SQURE_OF_GAME_PIXEL;
      break;
    default:
      break;
  }

  let snakeNextHeadPosition = pixelList[snakeHeadPosition];

  // Kill snake if eat by itself

  if (snakeNextHeadPosition.classList.contains('snakeBodyPixel')) {
    // Stop moving the snake
    clearInterval(moveSnakeInterval);
    if (!alert(`You have ate ${totalFoodAte} food`)) window.location.reload();
  }

  snakeNextHeadPosition.classList.add('snakeBodyPixel');

  setTimeout(
    () => snakeNextHeadPosition.classList.remove('snakeBodyPixel'),
    snakeLength
  );

  if (snakeHeadPosition === currentFoodPosition) {
    totalFoodAte++;
    snakeLength += 100;
    constructFood();
  }
};

const changeDirection = (newDirection) => {
  if (currentSnakeDirection === newDirection) return;

  if (newDirection === LEFT_DIR && currentSnakeDirection !== RIGHT_DIR) {
    currentSnakeDirection = newDirection;
  } else if (newDirection === UP_DIR && currentSnakeDirection !== DOWN_DIR) {
    currentSnakeDirection = newDirection;
  } else if (newDirection === RIGHT_DIR && currentSnakeDirection !== LEFT_DIR) {
    currentSnakeDirection = newDirection;
  } else if (newDirection === DOWN_DIR && currentSnakeDirection !== UP_DIR) {
    currentSnakeDirection = newDirection;
  }
};

constructBoard();

constructFood();
moveSnake();

var moveSnakeInterval = setInterval(moveSnake, 50);

addEventListener('keydown', (e) => changeDirection(e.keyCode));
