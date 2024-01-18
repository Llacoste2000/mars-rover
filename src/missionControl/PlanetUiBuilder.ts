import { Integer } from "../topologie/Integer";
import { Position } from "../topologie/Position";
import { PlanetUi } from "./PlanetUi";

export class PlanetUiBuilder {
  private planetSize = new Position(new Integer(5), new Integer(5));
  private roverPosition = new Position(new Integer(0), new Integer(0));
  private planetObstacles: Position[] = [];

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

  public build() {
    return new PlanetUi(this.planetSize, this.planetObstacles, this.roverPosition);
  }
}
