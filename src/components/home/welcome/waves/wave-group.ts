import { Wave } from "./wave";

export class WaveGroup {
  private totalWaves: number = 3;
  private totalPoints: number = 6;
  private color: string[] = [
    "rgba(0,199,235, 0.3)",
    "rgba(0,146,199,0.3)",
    "rgba(0,87,158,0.3)",
  ];

  private waves: Wave[] = [];

  constructor() {
    this.waves = Array(this.totalWaves)
      .fill(0)
      .map((_, i) => new Wave(i, this.totalPoints, this.color[i]));
  }

  resize(stageWidth: number, stageHeight: number) {
    this.waves.map((wave) => {
      wave.resize(stageWidth, stageHeight);
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.waves.map((wave) => {
      wave.draw(ctx);
    });
  }
}
