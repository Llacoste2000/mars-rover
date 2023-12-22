export class Position {
  constructor(public readonly x: number, public readonly y: number) { }

  public add(position: Position) {
    return new Position(this.x + position.x, this.y + position.y);
  }

  public subtract(position: Position) {
    return new Position(this.x - position.x, this.y - position.y);
  }

  public equals(position: Position) {
    return this.x === position.x && this.y === position.y
  }
}