import SnakeBody from "./classes/SnakeBody";
import Apple from "./classes/Apple";

import Direction from "./enums/Direction";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const snake = [new SnakeBody(canvas.width / 2, canvas.height / 2)];
const apple: Apple = new Apple(snake[0].getX(), snake[0].getY());
const standardSquareSize = snake[0].size;

const scoreDOM = document.getElementById('score')!;

let snakeDirection: Direction | null = null;

apple.newRandomPosition(canvas.width, canvas.height);

for (const body of snake) {
  while (
    apple.getX() === body.getX() ||
    apple.getY() === body.getY()
  )
    apple.newRandomPosition(canvas.width, canvas.height);
}


const clearAllCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const loadRecord = () => {
  const recordDOM = document.getElementById('record')!;

  if (!localStorage.getItem('record')!) {
    recordDOM.innerText = '0';
  } else {
    recordDOM.innerText = localStorage.getItem('record')!;
  }
}

const playSound = () => {
  const audio = new Audio();
  audio.src = '/../../src/assets/eat_sound.mp3';
  audio.play();
}

const resetGame = () => {
  clearAllCanvas();

  while (snake.length != 1)
    snake.pop();

  snake[0].setX(canvas.width / 2);
  snake[0].setY(canvas.height / 2);
  snakeDirection = null;
  apple.newRandomPosition(canvas.width, canvas.height);
  while (
    apple.getX() === snake[0].getX() ||
    apple.getY() === snake[0].getY()
  )
    apple.newRandomPosition(canvas.width, canvas.height);

  scoreDOM.innerText = "0";
}

const gameOver = () => {
  alert('Fim de jogo!');
  resetGame();
}

const moveSnake = () => {
  if (!snakeDirection) return;

  let previousX = snake[0].getX();
  let previousY = snake[0].getY();

  switch (snakeDirection) {
    case Direction.Up:
      snake[0].setY(snake[0].getY() - standardSquareSize);
      break;
    case Direction.Down:
      snake[0].setY(snake[0].getY() + standardSquareSize);
      break;
    case Direction.Left:
      snake[0].setX(snake[0].getX() - standardSquareSize);
      break;
    case Direction.Right:
      snake[0].setX(snake[0].getX() + standardSquareSize);
      break;
  }

  for (let i = 1; i < snake.length; i++) {
    const tempX = snake[i].getX();
    const tempY = snake[i].getY();

    snake[i].setX(previousX);
    snake[i].setY(previousY);

    previousX = tempX;
    previousY = tempY;
  }
};

const drawLines = () => {
  const linesColor = "#ffffffa8";
  ctx.strokeStyle = linesColor;
  ctx.beginPath();
  ctx.moveTo(0, 0);

  for (let i = 0; i < canvas.width / standardSquareSize; i++) {
    ctx.moveTo(i * standardSquareSize, 0);
    ctx.lineTo(i * standardSquareSize, canvas.height);
  }

  for (let j = 0; j < canvas.height / standardSquareSize; j++) {
    ctx.moveTo(0, j * standardSquareSize);
    ctx.lineTo(canvas.width, j * standardSquareSize);
  }

  ctx.stroke();
};

const drawSnake = () => {
  ctx.beginPath();

  for (const body of snake) {
    ctx.fillStyle = body.getColor();
    ctx.fillRect(body.getX(), body.getY(), standardSquareSize, standardSquareSize);
  }
};

const drawApple = () => {
  ctx.beginPath();
  ctx.fillStyle = apple.getColor();
  ctx.fillRect(apple.getX(), apple.getY(), standardSquareSize, standardSquareSize);
}

const isValidChangeOfDirection = (keyDirection: string) => {
  if (keyDirection === "Up" && snakeDirection === Direction.Down)
    return false;

  if (keyDirection === "Down" && snakeDirection === Direction.Up)
    return false;

  if (keyDirection === "Left" && snakeDirection === Direction.Right)
    return false;

  if (keyDirection === "Right" && snakeDirection === Direction.Left)
    return false;

  return true;
}

const changeDirection = (key: string) => {
  const keyDirection: string = key.slice(5, key.length);

  if (isValidChangeOfDirection(keyDirection))
    snakeDirection = keyDirection as Direction;
}

const receiveKeydown = (event: KeyboardEvent) => {
  const key = event.key;
  changeDirection(key);
}

const drawGame = () => {
  clearAllCanvas();
  drawLines();
  drawSnake();
  drawApple();
}

const checkSnakeWithAppleCollision = () => {
  if (snake[0].getX() === apple.getX() &&
    snake[0].getY() === apple.getY()) {
    const lastBody = snake[snake.length - 1];
    snake.push(new SnakeBody(lastBody.getX() + standardSquareSize, lastBody.getY() + standardSquareSize));
    playSound();
    apple.newRandomPosition(canvas.width, canvas.height);
    scoreDOM.innerText = (parseInt(scoreDOM.innerText) + 1).toString();

    if (!localStorage.getItem('record') || parseInt(localStorage.getItem('record')!) < parseInt(scoreDOM.innerText)) {
      localStorage.setItem('record', scoreDOM.innerText);
    }

    loadRecord();
  }
}

const checkSnakeWithWallCollision = () => {
  if (
    snake[0].getX() === -standardSquareSize ||
    snake[0].getX() === canvas.width ||
    snake[0].getY() === -standardSquareSize ||
    snake[0].getY() === canvas.height
  )
    gameOver();
}

const checkSnakeWithSnakeCollision = () => {
  for (let i = 1; i < snake.length; i++) {
    if (
      snake[0].getX() === snake[i].getX() &&
      snake[0].getY() === snake[i].getY() &&
      !(snake[0].getX() === apple.getX() && snake[0].getY() === apple.getY())
    )
      gameOver();
  }
}

setInterval(() => {
  moveSnake();
  drawGame();
  checkSnakeWithAppleCollision();
  checkSnakeWithWallCollision();
  checkSnakeWithSnakeCollision();
}, 200);

drawGame();
loadRecord();

document.addEventListener("keydown", receiveKeydown);