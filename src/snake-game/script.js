// Define the number of pixels in a row and total number of pixels based on board height and width
// Construct the pixels into the board
// Construct the food in the game board
// Define the direction and initlize the default direction to the snake
// Add implementation for the snake movement

const GAME_PIXEL_COUNT = 50;
const SQURE_OF_GAME_PIXEL_COUNT = Math.pow(GAME_PIXEL_COUNT, 2);

let score = 0;

const gameContainer = document.getElementById('gameContainer');

const constructGameBoardPixels = () => {
  for (let i = 1; i <= SQURE_OF_GAME_PIXEL_COUNT; ++i) {
    gameContainer.innerHTML = `${gameContainer.innerHTML} <div class="game-board-pixel" id="pixels-${i}"></div>`;
  }
};

const pixelList = document.getElementsByClassName('game-board-pixel');

let foodPosition = 0;

const constructFood = () => {
  pixelList[foodPosition].classList.remove('food');

  foodPosition = Math.random();
  foodPosition = Math.floor(foodPosition * SQURE_OF_GAME_PIXEL_COUNT);
  pixelList[foodPosition].classList.add('food');
};

const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;

let snakeDirection = RIGHT;
let snakeHeadPosition = SQURE_OF_GAME_PIXEL_COUNT / 2;
let snakeLenght = 1000;

const moveSnake = () => {
  switch (snakeDirection) {
    case RIGHT:
      ++snakeHeadPosition;
      const isSnakeHeadReachedToRightCorner =
        snakeHeadPosition % GAME_PIXEL_COUNT === 0;
      if (isSnakeHeadReachedToRightCorner)
        snakeHeadPosition = snakeHeadPosition - GAME_PIXEL_COUNT;
      break;
    case LEFT:
      --snakeHeadPosition;
      const isSnakeHeadReachedLeftCorner =
        snakeHeadPosition % GAME_PIXEL_COUNT === GAME_PIXEL_COUNT - 1 ||
        snakeHeadPosition < 0;
      if (isSnakeHeadReachedLeftCorner)
        snakeHeadPosition = snakeHeadPosition + GAME_PIXEL_COUNT;
      break;
    case UP:
      snakeHeadPosition = snakeHeadPosition - GAME_PIXEL_COUNT;
      const isHeadReachedToTopCorner = snakeHeadPosition < 0;
      if (isHeadReachedToTopCorner)
        snakeHeadPosition = snakeHeadPosition + SQURE_OF_GAME_PIXEL_COUNT;
      break;
    case DOWN:
      snakeHeadPosition = snakeHeadPosition + GAME_PIXEL_COUNT;
      const isHeadReachedToBottom =
        snakeHeadPosition > SQURE_OF_GAME_PIXEL_COUNT - 1;
      if (isHeadReachedToBottom)
        snakeHeadPosition = snakeHeadPosition - SQURE_OF_GAME_PIXEL_COUNT;
      break;
    default:
      break;
  }

  let snakeNextHeadPosition = pixelList[snakeHeadPosition];

  if (snakeNextHeadPosition.classList.contains('snakeBodyPixel')) {
    clearInterval(moveSnakeInterval);
    if (!alert(`Your Score ${score}.`)) window.location.reload();
  }

  snakeNextHeadPosition.classList.add('snakeBodyPixel');

  setTimeout(
    () => snakeNextHeadPosition.classList.remove('snakeBodyPixel'),
    snakeLenght
  );

  if (snakeHeadPosition === foodPosition) {
    score++;
    snakeLenght += 100;
    constructFood();
  }
};

const changeDirection = (newDirection) => {
  if (newDirection === snakeDirection) return;

  if (newDirection === LEFT && snakeDirection !== RIGHT) {
    snakeDirection = newDirection;
  } else if (newDirection === RIGHT && snakeDirection !== LEFT) {
    snakeDirection = newDirection;
  } else if (newDirection === UP && snakeDirection !== DOWN) {
    snakeDirection = newDirection;
  } else if (newDirection === DOWN && snakeDirection !== UP) {
    snakeDirection = newDirection;
  }
};

document.addEventListener('keydown', (e) => changeDirection(e.keyCode));

constructGameBoardPixels();
constructFood();

var moveSnakeInterval = setInterval(moveSnake, 80);
