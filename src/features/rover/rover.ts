import {
  IRover,
  Position,
} from "./types";
import { EOrientation, Orientation } from "../orientation/Orientation.ts";
import { IPlanet } from "../planet/Planet.interface.ts";

export class Rover implements IRover {
  constructor(public position: Position, public orientation: Orientation, private planet: IPlanet) {
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
        this.position = this.planet.normalize({
          x: this.position.x,
          y: this.position.y + 1,
        });
        break;
      case EOrientation.E:
        this.position = this.planet.normalize({
          x: this.position.x + 1,
          y: this.position.y,
        });
        break;
      case EOrientation.S:
        this.position = this.planet.normalize({
          x: this.position.x + this.planet.size.x,
          y: this.position.y - 1,
        });
        break;
      case EOrientation.W:
        this.position = this.planet.normalize({
          x: this.position.x - 1 + this.planet.size.x,
          y: this.position.y,
        });
        break;
    }

    return this;
  }
  backward() {
    switch (this.orientation.letter) {
      case EOrientation.N:
        this.position = this.planet.normalize({
          x: this.position.x,
          y: this.position.y - 1 + this.planet.size.y,
        });
        break;
      case EOrientation.E:
        this.position = this.planet.normalize({
          x: this.position.x - 1 + this.planet.size.x,
          y: this.position.y,
        });
        break;
      case EOrientation.S:
        this.position = this.planet.normalize({
          x: this.position.x,
          y: this.position.y + 1,
        });
        break;
      case EOrientation.W:
        this.position = this.planet.normalize({
          x: this.position.x + 1,
          y: this.position.y,
        });
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
