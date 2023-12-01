import {
  IRover,
  Position,
} from "./types";
import { EOrientation, Orientation } from "../orientation/Orientation.ts";
import { IPlanet } from "../planet/Planet.interface.ts";

export class Rover implements IRover {
  constructor(public position: Position, public orientation: Orientation, private _planet: IPlanet) {
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

    this.position = this._planet.normalize(newPosition)

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
