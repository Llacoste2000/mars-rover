import { Orientation, EOrientation } from "../orientation/Orientation";
import { IPlanet } from "../planet/Planet.interface";
import { PlanetToroidal } from "../planet/PlanetToroidal";
import { Rover } from "./rover";
import { Position } from "./types";

export class RoverBuilder {
  private position: Position = { x: 0, y: 0 };
  private orientation: Orientation = new Orientation(EOrientation.N);
  private planet = new PlanetToroidal({ x: 5, y: 5 });

  oriented(orientation: Orientation): this {
    this.orientation = orientation;
    return this;
  }

  withPosition(position: Position): this {
    this.position = position;
    return this;
  }

  onPlanet(planet: IPlanet): this {
    this.planet = planet;
    return this;
  }

  build(): Rover {
    return new Rover(this.position, this.orientation, this.planet);
  }

}