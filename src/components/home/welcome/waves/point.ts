export class Point {
  private _x: number;
  private _y: number;
  private fixedY;
  private cur;
  private speed;
  private max;

  constructor(index: number, _x: number, _y: number) {
    this._x = _x;
    this._y = _y;
    this.fixedY = _y;
    this.cur = index;
    this.speed = 0.06;
    this.max = 36;
  }

  update() {
    this.cur += this.speed;
    this._y = this.fixedY + Math.sin(this.cur) * this.max;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }
}
