import { Point } from "./point";

export class Wave {
  private index: number;
  private totalPoints: number;
  private color: string;
  private stageWidth: number = 0;
  private stageHeight: number = 0;
  private centerY: number = 0;
  private pointGap: number = 0;

  private points: Point[] = [];

  constructor(index: number, totalPoints: number, color: string) {
    this.index = index;
    this.totalPoints = totalPoints;
    this.color = color;
  }

  resize(stageWidth: number, stageHeight: number) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.centerY = stageHeight / 2;

    this.pointGap = this.stageWidth / (this.totalPoints - 1);

    this.init();
  }

  init() {
    this.points = Array(this.totalPoints)
      .fill(0)
      .map(
        (_, i) => new Point(this.index + i, this.pointGap * i, this.centerY)
      );
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    ctx.moveTo(prevX, prevY);

    for (let i = 0; i < this.totalPoints; i++) {
      if (i < this.totalPoints - 1) {
        this.points[i].update();
      }

      const cx = (prevX + this.points[i].x) / 2;
      const cy = (prevY + this.points[i].y) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = this.points[i].x;
      prevY = this.points[i].y;
    }

    ctx.lineTo(prevX, prevY);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(this.points[0].x, this.stageHeight);
    ctx.fill();
    ctx.closePath();
  }
}
