import { Integer } from "../topologie/Integer";
import { Position } from "../topologie/Position";
import { PlanetUiConsole } from "./PlanetUiConsole";

export class PlanetUiBuilder {
  private planetSize = new Position(new Integer(5), new Integer(5));
  private roverPosition = new Position(new Integer(0), new Integer(0));
  private planetObstacles: Position[] = [];
  private discoveredPositions: Position[] = [];

  public withPlanetSize(planetSize: Position) {
    this.planetSize = planetSize;
    return this;
  }

  public withRoverPosition(roverPosition: Position) {
    this.roverPosition = roverPosition;
    return this;
  }

  public withPlanetObstacles(planetObstacles: Position[]) {
    this.planetObstacles = planetObstacles;
    return this;
  }

  public withDiscoveredPositions(discoveredPositions: Position[]) {
    this.discoveredPositions = discoveredPositions;
    return this;
  }

  public build() {
    return new PlanetUiConsole(this.planetSize, this.planetObstacles, this.roverPosition, this.discoveredPositions);
  }
}
