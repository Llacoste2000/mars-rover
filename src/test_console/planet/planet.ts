export class Planet {

  constructor(private readonly size: { x: number, y: number }) {
  }

  getMaxX(): number {
    return this.size.x;
  }

  getMaxY(): number {
    return this.size.y;
  }
}