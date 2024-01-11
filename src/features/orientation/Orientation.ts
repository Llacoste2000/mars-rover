import { Integer } from "../integer/Integer";
import { Position } from "../position/Position";

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
    switch (this._letter) {
      case EOrientation.N:
        return Orientation.East;
      case EOrientation.E:
        return Orientation.South;
      case EOrientation.S:
        return Orientation.West;
      case EOrientation.W:
        return Orientation.North;
    }
  }

  public counterClockwise(): Orientation {
    switch (this._letter) {
      case EOrientation.N:
        return Orientation.West;
      case EOrientation.E:
        return Orientation.North;
      case EOrientation.S:
        return Orientation.East;
      case EOrientation.W:
        return Orientation.South;
    }
  }

  public toString(): string {
    return this._letter;
  }
}