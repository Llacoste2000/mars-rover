import { Integer } from "../../core/topologie/Integer";
import { Orientation } from "../../core/topologie/Orientation";
import { IPlanet } from "../../core/topologie/Planet.interface";
import { PlanetToroidal } from "../../core/topologie/PlanetToroidal";
import { Position } from "../../core/topologie/Position";
import { Rover } from "./Rover";

// Service
export class RoverBuilder {
  private roverConfig = {
    position: new Position(Integer.zero, Integer.zero),
    orientation: Orientation.North,
  };
  private planet: IPlanet = new PlanetToroidal(new Position(new Integer(5), new Integer(5)));

  oriented(orientation: Orientation): this {
    this.roverConfig.orientation = orientation;
    return this;
  }

  withPosition(position: Position): this {
    this.roverConfig.position = position;
    return this;
  }

  onPlanet(planet: IPlanet): this {
    this.planet = planet;
    return this;
  }

  build(): Rover {
    return new Rover(this.roverConfig.position, this.roverConfig.orientation, this.planet);
  }
}
