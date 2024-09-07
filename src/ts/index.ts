import SnakeBody from "./classes/SnakeBody";
import Apple from "./classes/Apple";

import Direction from "./enums/Direction";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const snake = [new SnakeBody(canvas.width / 2, canvas.height / 2)];
const apple: Apple = new Apple(snake[0].getX(), snake[0].getY());
const standardSquareSize = snake[0].size;

let snakeDirection: Direction | null = null;

const resetGame = () => {
  snake[0].setX(canvas.width / 2);
  snake[0].setY(canvas.height / 2);
  snakeDirection = null;
  apple.newRandomPosition(canvas.width, canvas.height);
  while (
    apple.getX() === snake[0].getX() ||
    apple.getY() === snake[0].getY()
  )
    apple.newRandomPosition(canvas.width, canvas.height);
}

apple.newRandomPosition(canvas.width, canvas.height);

while (
  apple.getX() === snake[0].getX() ||
  apple.getY() === snake[0].getY()
)
  apple.newRandomPosition(canvas.width, canvas.height);

const clearAllCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const moveSnake = () => {
  if (!snakeDirection) return;

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
    if (i != 0) {
      snake[i].setX(snake[i - 1].getX());
      snake[i].setY(snake[i - 1].getY());
    }
  }
};

const drawLines = () => {
  ctx.strokeStyle = "#ffffffa8";
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
  clearAllCanvas();
  drawLines();

  for (const body of snake) {
    ctx.beginPath();
    ctx.fillStyle = body.getColor();
    ctx.fillRect(body.getX(), body.getY(), standardSquareSize, standardSquareSize);
  }
};

const drawApple = () => {
  drawLines();
  drawSnake();

  ctx.beginPath();
  ctx.fillStyle = apple.getColor();
  ctx.fillRect(apple.getX(), apple.getY(), standardSquareSize, standardSquareSize);
  console.table(apple);
}

const changeDirection = (key: string) => {
  const keyDirection: string = key.slice(5, key.length);
  snakeDirection = keyDirection as Direction;
}

const receiveKeydown = (event: KeyboardEvent) => {
  const key = event.key;
  changeDirection(key);
}

const drawGame = () => {
  drawApple();
}

// TODO: Consertar colisão com maçã
const checkSnakeWithAppleCollision = () => {
  if (snake[0].getX() === apple.getX() &&
    snake[0].getY() === apple.getY()) {

    const newSegment = new SnakeBody(apple.getX(), apple.getY())

    switch (snakeDirection) {
      case Direction.Up:
        newSegment.setY(snake[0].getY() - standardSquareSize);
        break;
      case Direction.Down:
        newSegment.setY(snake[0].getY() + standardSquareSize);
        break;
      case Direction.Left:
        newSegment.setX(snake[0].getX() - standardSquareSize);
        break;
      case Direction.Right:
        newSegment.setX(snake[0].getX() + standardSquareSize);
        break;
    }

    snake.push(newSegment);
    apple.newRandomPosition(canvas.width, canvas.height);
  }
}

const checkSnakeWithWallCollision = () => {
  if (
    snake[0].getX() === -standardSquareSize ||
    snake[0].getX() === canvas.width ||
    snake[0].getY() === -standardSquareSize ||
    snake[0].getY() === canvas.height
  ) {
    alert('Game Over');
    resetGame();
  }
}

// TODO: Consertar colisão com a cobra
const checkSnakeWithSnakeCollision = () => {
  for (let i = 1; i < snake.length; i++) {
    if (
      snake[0].getX() === snake[i].getX() &&
      snake[0].getY() === snake[i].getY() &&
      !(snake[0].getX() === apple.getX() && snake[0].getY() === apple.getY())
    ) {
      alert('Game Over');
      resetGame();
    }
  }
}

setInterval(() => {
  moveSnake();
  drawGame();
  checkSnakeWithAppleCollision();
  checkSnakeWithWallCollision();
  // checkSnakeWithSnakeCollision();
}, 200);

canvas.addEventListener("load", () => {
  drawGame();
});

document.addEventListener("keydown", receiveKeydown);