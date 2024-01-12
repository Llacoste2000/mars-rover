import { IRover } from "./Rover.interface.ts";
import { Orientation } from "../topologie/Orientation.ts";
import { IPlanet } from "../topologie/Planet.interface.ts";
import { Position } from "../topologie/Position.ts";

// Objet-valeur
export class Rover implements IRover {
  constructor(public readonly position: Position, public readonly orientation: Orientation, private readonly _planet: IPlanet) {
    if (!this._planet.isPositionAvailable(this.position)) {
      throw new Error("The rover can't be on an obstacle");
    }
  }

  turnRight() {
    const rightOrientation = this.orientation.clockwise()

    return new Rover(this.position, rightOrientation, this._planet);
  }

  turnLeft() {
    const leftOrientation = this.orientation.counterClockwise()

    return new Rover(this.position, leftOrientation, this._planet);
  }

  forward() {
    const newPosition = this.position.add(this.orientation.vector);
    const newPositionNormalized = this._planet.normalize(newPosition);

    try {
      return new Rover(newPositionNormalized, this.orientation, this._planet);
    } catch (error) {
      return this;
    }
  }

  backward() {
    const newPosition = this.position.subtract(this.orientation.vector);
    const newPositionNormalized = this._planet.normalize(newPosition);

    try {
      return new Rover(newPositionNormalized, this.orientation, this._planet);
    } catch (error) {
      return this;
    }
  }

  toString() {
    return `Rover orienté ${this.orientation.toString()} à la position ${this.position.toString()}`
  }
}