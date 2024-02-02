import { Integer } from "@Domain//topologie/Integer";
import { Orientation } from "@Domain//topologie/Orientation";
import { Position } from "@Domain//topologie/Position";
import { PlanetUiConsole } from "./PlanetUiConsole";

type PlanetConfig = {
  planetObstacles: Position[];
  planetSize: Position;
  discoveredPositions: Position[];
};

type RoverConfig = {
  roverPosition: Position;
  roverOrientation: Orientation;
};

export class PlanetUiBuilder {
  private _roverConfig: RoverConfig = {
    roverPosition: new Position(new Integer(0), new Integer(0)),
    roverOrientation: Orientation.North,
  };
  private _planetConfig: PlanetConfig = {
    planetObstacles: [],
    planetSize: new Position(new Integer(5), new Integer(5)),
    discoveredPositions: [],
  };

  public withPlanetSize(planetSize: Position) {
    this._planetConfig.planetSize = planetSize;
    return this;
  }

  public withRoverPosition(roverPosition: Position) {
    this._roverConfig.roverPosition = roverPosition;
    return this;
  }

  public withPlanetObstacles(planetObstacles: Position[]) {
    this._planetConfig.planetObstacles = planetObstacles;
    return this;
  }

  public withDiscoveredPositions(discoveredPositions: Position[]) {
    this._planetConfig.discoveredPositions = discoveredPositions;
    return this;
  }

  public withRoverOrientation(roverOrientation: Orientation) {
    this._roverConfig.roverOrientation = roverOrientation;
    return this;
  }

  public build() {
    return new PlanetUiConsole(
      this._planetConfig.planetSize,
      this._planetConfig.planetObstacles,
      this._roverConfig.roverPosition,
      this._roverConfig.roverOrientation,
      this._planetConfig.discoveredPositions,
    );
  }
}
