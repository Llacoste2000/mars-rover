import { Integer } from "./Integer";
import { Position } from "./Position";

const EOrientation = {
  N: "N",
  S: "S",
  E: "E",
  W: "W",
} as const;
type OrientationLetter = (typeof EOrientation)[keyof typeof EOrientation];

// Objet-valeur
export class Orientation {
  static readonly North = new Orientation(EOrientation.N, new Position(Integer.zero, Integer.one));
  static readonly East = new Orientation(EOrientation.E, new Position(Integer.one, Integer.zero));
  static readonly South = new Orientation(EOrientation.S, new Position(Integer.zero, Integer.minusOne));
  static readonly West = new Orientation(EOrientation.W, new Position(Integer.minusOne, Integer.zero));

  constructor(private readonly _letter: OrientationLetter, public readonly vector: Position) { }

  public clockwise(): Orientation {
    if (this._letter === EOrientation.N) return Orientation.East;
    if (this._letter === EOrientation.E) return Orientation.South;
    if (this._letter === EOrientation.S) return Orientation.West;
    if (this._letter === EOrientation.W) return Orientation.North;
    return this;
  }

  public counterClockwise(): Orientation {
    if (this._letter === EOrientation.N) return Orientation.West;
    if (this._letter === EOrientation.E) return Orientation.North;
    if (this._letter === EOrientation.S) return Orientation.East;
    if (this._letter === EOrientation.W) return Orientation.South;
    return this;
  }

  public toString(): string {
    return this._letter;
  }
}