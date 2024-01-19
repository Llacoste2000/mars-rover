import { EOrientation, Orientation, OrientationLetter } from "./Orientation";

export class OrientationFactory {
  static createOrientation(orientationLetter: OrientationLetter) {
    if (orientationLetter === EOrientation.N) {
      return Orientation.North;
    }

    if (orientationLetter === EOrientation.E) {
      return Orientation.East;
    }

    if (orientationLetter === EOrientation.S) {
      return Orientation.South;
    }

    if (orientationLetter === EOrientation.W) {
      return Orientation.West;
    }

    throw new Error(`Unknown orientation ${orientationLetter}`);
  }
}
