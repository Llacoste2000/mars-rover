import { Orientation } from "../orientation/Orientation";
import { IPlanet } from "../planet/Planet.interface";
import { PlanetToroidal } from "../planet/PlanetToroidal";
import { Position } from "../position/Position";
import { Rover } from "./rover";

// Service
export class RoverBuilder {
  private position = new Position(0, 0);
  private orientation = Orientation.North
  private planet: IPlanet = new PlanetToroidal(new Position(5, 5));

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