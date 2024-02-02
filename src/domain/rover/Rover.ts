import { IRover } from "./Rover.interface.ts";
import { Orientation } from "@Domaintopologie/Orientation.ts";
import { IPlanet } from "@Domaintopologie/Planet.interface.ts";
import { Position } from "@Domaintopologie/Position.ts";
import { ObstacleError } from "@Infrastructure/errors/ObstacleError.ts";

// Objet-valeur
export class Rover implements IRover {
  constructor(
    public readonly position: Position,
    public readonly orientation: Orientation,
    private readonly _planet: IPlanet,
  ) {
    if (!this._planet.isPositionAvailable(this.position)) {
      throw new ObstacleError(this.position);
    }
  }

  turnRight() {
    const rightOrientation = this.orientation.clockwise();

    return new Rover(this.position, rightOrientation, this._planet);
  }

  turnLeft() {
    const leftOrientation = this.orientation.counterClockwise();

    return new Rover(this.position, leftOrientation, this._planet);
  }

  forward() {
    const newPosition = this.position.add(this.orientation.vector);
    const newPositionNormalized = this._planet.normalize(newPosition);

    return new Rover(newPositionNormalized, this.orientation, this._planet);
  }

  backward() {
    const newPosition = this.position.subtract(this.orientation.vector);
    const newPositionNormalized = this._planet.normalize(newPosition);

    return new Rover(newPositionNormalized, this.orientation, this._planet);
  }

  toString() {
    return `Rover orienté ${this.orientation.toString()} à la position ${this.position.toString()}`;
  }
}
