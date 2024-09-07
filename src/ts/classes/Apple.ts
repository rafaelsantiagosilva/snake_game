import Square from "./Square";

export default class SnakeBody extends Square {
  private color: string;

  constructor(x: number, y: number) {
    super(x, y);
    this.color = "#f00";
  }

  getColor(): string {
    return this.color;
  }


  newRandomPosition(canvasWidth: number, canvasHeight: number): void {
    do {
      this.x = Math.round(Math.random() * (canvasWidth / this.size)) * this.size;
      this.y = Math.round(Math.random() * (canvasHeight / this.size)) * this.size;
    } while (
      this.getY() > canvasHeight - this.size ||
      this.getY() < this.size ||
      this.getX() > canvasWidth - this.size ||
      this.getX() < this.size
    );
  }
}