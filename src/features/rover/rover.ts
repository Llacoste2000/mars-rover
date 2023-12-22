import {
  IRover,
} from "./Rover.interface.ts";
import { EOrientation, Orientation } from "../orientation/Orientation.ts";
import { IPlanet } from "../planet/Planet.interface.ts";
import { Position } from "../position/Position.ts";

export class Rover implements IRover {
  constructor(public position: Position, public orientation: Orientation, private _planet: IPlanet) {
    if (this._planet.isObstacle(this.position)) {
      throw new Error("The rover can't spawn on an obstacle");
    }
  }

  private setOrientation(orientation: Orientation) {
    this.orientation = orientation;
  }

  turnRight() {
    const rightOrientation = this.orientation.right()
    this.setOrientation(rightOrientation);

    return this;
  }

  turnLeft(): this {
    const leftOrientation = this.orientation.left()
    this.setOrientation(leftOrientation);

    return this;
  }

  private move(orientation: Orientation, isForward: boolean): this {
    const newPosition = { ...this.position };

    switch (orientation.letter) {
      case EOrientation.N:
        newPosition.y += isForward ? 1 : -1;
        break;
      case EOrientation.E:
        newPosition.x += isForward ? 1 : - 1;
        break;
      case EOrientation.S:
        newPosition.y += isForward ? - 1 : 1;
        break;
      case EOrientation.W:
        newPosition.x += isForward ? - 1 : 1;
        break;
    }

    const newPositionNormalized = this._planet.normalize(newPosition);

    if (this._planet.isObstacle(newPositionNormalized)) {
      return this;
    }

    this.position = newPositionNormalized

    return this;

  }

  forward() {
    return this.move(this.orientation, true);
  }

  backward() {
    return this.move(this.orientation, false);
  }

  printPosition() {
    console.log(
      `Rover orienté ${this.orientation.letter} à la position ${this.position.x},${this.position.y}`,
    );
  }
}
