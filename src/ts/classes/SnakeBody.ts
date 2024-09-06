import Square from "./Square";

export default class SnakeBody extends Square {
  private color: string;

  constructor(x:number, y:number) {
    super(x, y);
    this.color = "#0f0";
  }

  getColor(): string {
    return this.color;
  }
}