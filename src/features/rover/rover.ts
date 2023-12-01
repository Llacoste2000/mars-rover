import {
  IRover,
  Position,
} from "./types";
import { Planet } from "../planet/planet.ts";
import { EOrientation, Orientation } from "../orientation/Orientation.ts";

export class Rover implements IRover {


  constructor(public position: Position, public orientation: Orientation, private planet: Planet) {
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
  forward() {
    switch (this.orientation.letter) {
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

    return this;
  }
  backward() {
    switch (this.orientation.letter) {
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

    return this;
  }

  printPosition() {
    console.log(
      `Rover orienté ${this.orientation.letter} à la position ${this.position.x},${this.position.y}`,
    );
  }
}
