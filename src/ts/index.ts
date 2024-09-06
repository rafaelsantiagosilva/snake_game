import Square from "./classes/Square";
import SnakeBody from "./classes/SnakeBody";
import Apple from "./classes/Apple";

import Direction from "./enums/Direction";

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const standardSquareSize = Square.size;
const snake = [
  new SnakeBody(canvas.width / 2, canvas.height / 2),
  new SnakeBody((canvas.width / 2) - standardSquareSize, (canvas.height / 2)),
  new SnakeBody((canvas.width / 2) - standardSquareSize *2, (canvas.height / 2))
];

let snakeDirection: Direction | null = null;

const clearAllCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const moveSnake = () => {
  if (!snakeDirection) return;

  // Armazenar as posições anteriores
  let previousX = snake[0].getX();
  let previousY = snake[0].getY();

  // Movimentar a cabeça da cobra
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

  // Movimentar o corpo da cobra (partes que seguem a cabeça)
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
  ctx.strokeStyle = "#fff";
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
  let previousBody: null | SnakeBody = null;

  clearAllCanvas();
  drawLines();

  for (const body of snake) {
    ctx.beginPath();
    ctx.fillStyle = body.getColor();
    ctx.fillRect(body.getX(), body.getY(), standardSquareSize, standardSquareSize);
  }
};

const changeDirection = (key: string) => {
  const keyDirection: string = key.slice(5, key.length);
  snakeDirection = keyDirection as Direction;
}

const receiveKeydown = (event: KeyboardEvent) => {
  const key = event.key;
  changeDirection(key);
}

drawLines();

setInterval(() => {
  moveSnake();
  drawSnake();
}, 500);

document.addEventListener("keydown", receiveKeydown);