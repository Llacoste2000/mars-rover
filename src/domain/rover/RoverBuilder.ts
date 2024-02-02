import { Integer } from "@Domain/topologie/Integer";
import { Orientation } from "@Domain/topologie/Orientation";
import { IPlanet } from "@Domain/topologie/Planet.interface";
import { PlanetToroidal } from "@Domain/topologie/PlanetToroidal";
import { Position } from "@Domain/topologie/Position";
import { Rover } from "./Rover";

// Service
export class RoverBuilder {
  private _roverConfig = {
    position: new Position(Integer.zero, Integer.zero),
    orientation: Orientation.North,
  };
  private _planet: IPlanet = new PlanetToroidal(new Position(new Integer(5), new Integer(5)));

  oriented(orientation: Orientation): this {
    this._roverConfig.orientation = orientation;
    return this;
  }

  withPosition(position: Position): this {
    this._roverConfig.position = position;
    return this;
  }

  onPlanet(planet: IPlanet): this {
    this._planet = planet;
    return this;
  }

  build(): Rover {
    return new Rover(this._roverConfig.position, this._roverConfig.orientation, this._planet);
  }
}
