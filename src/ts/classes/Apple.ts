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
}