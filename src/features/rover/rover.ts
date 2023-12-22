import {
  IRover,
} from "./Rover.interface.ts";
import { Orientation } from "../orientation/Orientation.ts";
import { IPlanet } from "../planet/Planet.interface.ts";
import { Position } from "../position/Position.ts";


// Objet-valeur
export class Rover implements IRover {
  constructor(public readonly position: Position, public readonly orientation: Orientation, private readonly _planet: IPlanet) {
    if (!this._planet.isPositionAvailable(this.position)) {
      throw new Error("The rover can't be on an obstacle");
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

  private move(isForward: boolean) {

    const newPosition = isForward ? this.position.add(this.orientation.vector) : this.position.subtract(this.orientation.vector);

    const newPositionNormalized = this._planet.normalize(newPosition);

    try {
      return new Rover(newPositionNormalized, this.orientation, this._planet);
    } catch (error) {
      return this;
    }
  }

  forward() {
    return this.move(true);
  }

  backward() {
    return this.move(false);
  }

  printPosition() {
    console.log(
      `Rover orienté ${this.orientation.toString()} à la position ${this.position.x},${this.position.y}`,
    );
  }
}
