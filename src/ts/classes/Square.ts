export default abstract class Body {
  protected x: number;
  protected y: number;
  public size: number = 25;

  constructor(x:number, y:number) {
    this.x = x;
    this.y = y;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }
}
