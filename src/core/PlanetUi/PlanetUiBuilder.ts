import { Integer } from "../topologie/Integer";
import { Orientation } from "../topologie/Orientation";
import { Position } from "../topologie/Position";
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
  private roverConfig: RoverConfig = {
    roverPosition: new Position(new Integer(0), new Integer(0)),
    roverOrientation: Orientation.North,
  };
  private planetConfig: PlanetConfig = {
    planetObstacles: [],
    planetSize: new Position(new Integer(5), new Integer(5)),
    discoveredPositions: [],
  };

  public withPlanetSize(planetSize: Position) {
    this.planetConfig.planetSize = planetSize;
    return this;
  }

  public withRoverPosition(roverPosition: Position) {
    this.roverConfig.roverPosition = roverPosition;
    return this;
  }

  public withPlanetObstacles(planetObstacles: Position[]) {
    this.planetConfig.planetObstacles = planetObstacles;
    return this;
  }

  public withDiscoveredPositions(discoveredPositions: Position[]) {
    this.planetConfig.discoveredPositions = discoveredPositions;
    return this;
  }

  public withRoverOrientation(roverOrientation: Orientation) {
    this.roverConfig.roverOrientation = roverOrientation;
    return this;
  }

  public build() {
    return new PlanetUiConsole(
      this.planetConfig.planetSize,
      this.planetConfig.planetObstacles,
      this.roverConfig.roverPosition,
      this.roverConfig.roverOrientation,
      this.planetConfig.discoveredPositions,
    );
  }
}
