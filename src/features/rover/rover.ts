import {
  IRover,
} from "./Rover.interface.ts";
import { EOrientation, Orientation } from "../orientation/Orientation.ts";
import { IPlanet } from "../planet/Planet.interface.ts";
import { Position } from "../position/Position.ts";


// Objet-valeur
export class Rover implements IRover {
  constructor(public readonly position: Position, public readonly orientation: Orientation, private readonly _planet: IPlanet) {
    if (this._planet.isObstacle(this.position)) {
      throw new Error("The rover can't spawn on an obstacle");
    }
  }

  turnRight() {
    const rightOrientation = this.orientation.right()

    return new Rover(this.position, rightOrientation, this._planet);
  }

  turnLeft() {
    const leftOrientation = this.orientation.left()

    return new Rover(this.position, leftOrientation, this._planet);
  }

  private move(orientation: Orientation, isForward: boolean) {
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

    return new Rover(newPositionNormalized, orientation, this._planet);

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
