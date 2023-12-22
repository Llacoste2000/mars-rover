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
  static readonly North = new Orientation(EOrientation.N, new Position(0, 1));
  static readonly East = new Orientation(EOrientation.E, new Position(1, 0));
  static readonly South = new Orientation(EOrientation.S, new Position(0, -1));
  static readonly West = new Orientation(EOrientation.W, new Position(-1, 0));

  constructor(private readonly _letter: OrientationLetter, public readonly vector: Position) { }

  public right(): Orientation {
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

  public left(): Orientation {
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