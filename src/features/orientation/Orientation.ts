export const EOrientation = {
  N: "N",
  S: "S",
  E: "E",
  W: "W",
} as const;
export type OrientationLetter = (typeof EOrientation)[keyof typeof EOrientation];

// Objet-valeur
export class Orientation {
  public readonly letter: OrientationLetter;

  constructor(orientation: OrientationLetter) {
    this.letter = orientation;
  }

  public right(): Orientation {
    switch (this.letter) {
      case EOrientation.N:
        return new Orientation(EOrientation.E);
      case EOrientation.E:
        return new Orientation(EOrientation.S);
      case EOrientation.S:
        return new Orientation(EOrientation.W);
      case EOrientation.W:
        return new Orientation(EOrientation.N);
    }
  }

  public left(): Orientation {
    switch (this.letter) {
      case EOrientation.N:
        return new Orientation(EOrientation.W);
      case EOrientation.E:
        return new Orientation(EOrientation.N);
      case EOrientation.S:
        return new Orientation(EOrientation.E);
      case EOrientation.W:
        return new Orientation(EOrientation.S);
    }
  }
}