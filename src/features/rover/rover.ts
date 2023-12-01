import {
  EOrientation,
  IRover,
  Orientation,
  Position,
  orientations,
} from "./types";
import { Planet } from "../planet/planet.ts";

export class Rover implements IRover {
  orientation: Orientation = EOrientation.N;
  position: Position = { x: 0, y: 0 };
  planet: Planet;

  constructor(x: number, y: number, planet: Planet) {
    this.position = { x, y };
    this.planet = planet;
  }

  private getIndexOfCurrentOrientation() {
    return orientations.indexOf(this.orientation);
  }

  private getOrientationFromIndex(index: number) {
    return orientations[index];
  }

  private setOrientation(orientation: Orientation) {
    this.orientation = orientation;
  }

  turnRight() {
    const nextIndex =
      (this.getIndexOfCurrentOrientation() + 1) % orientations.length;

    this.setOrientation(this.getOrientationFromIndex(nextIndex));
  }
  turnLeft() {
    const previousIndex =
      (this.getIndexOfCurrentOrientation() - 1 + orientations.length) %
      orientations.length;

    this.setOrientation(this.getOrientationFromIndex(previousIndex));
  }
  forward() {
    switch (this.orientation) {
      case EOrientation.N:
        this.position.y = (this.position.y + 1) % this.planet.getMaxY();
        break;
      case EOrientation.E:
        this.position.x = (this.position.x + 1) % this.planet.getMaxX();
        break;
      case EOrientation.S:
        this.position.y =
          (this.position.y - 1 + this.planet.getMaxY()) % this.planet.getMaxY();
        break;
      case EOrientation.W:
        this.position.x =
          (this.position.x - 1 + this.planet.getMaxX()) % this.planet.getMaxX();
        break;
    }
  }
  backward() {
    switch (this.orientation) {
      case EOrientation.N:
        this.position.y =
          (this.position.y - 1 + this.planet.getMaxY()) % this.planet.getMaxY();
        break;
      case EOrientation.E:
        this.position.x =
          (this.position.x - 1 + this.planet.getMaxX()) % this.planet.getMaxX();
        break;
      case EOrientation.S:
        this.position.y = (this.position.y + 1) % this.planet.getMaxY();
        break;
      case EOrientation.W:
        this.position.x = (this.position.x + 1) % this.planet.getMaxX();
        break;
    }
  }

  printPosition() {
    console.log(
      `Rover orienté ${this.orientation} à la position ${this.position.x},${this.position.y}`,
    );
  }
}
