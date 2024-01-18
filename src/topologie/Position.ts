import { Integer } from "./Integer";

export class Position {
  constructor(
    public readonly x: Integer,
    public readonly y: Integer,
  ) {}

  public add(position: Position) {
    return new Position(this.x.add(position.x), this.y.add(position.y));
  }

  public subtract(position: Position) {
    return new Position(this.x.subtract(position.x), this.y.subtract(position.y));
  }

  public equals(position: Position) {
    return this.x.equals(position.x) && this.y.equals(position.y);
  }

  public toString() {
    return `(${this.x.toString()}, ${this.y.toString()})`;
  }
}
