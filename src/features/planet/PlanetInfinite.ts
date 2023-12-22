import { Position } from "../position/Position";
import { IPlanet } from "./Planet.interface";

export class PlanetInfinite implements IPlanet {
  public normalize(position: Position) {
    return position;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public isObstacle(_position: Position): boolean {
    return false;
  }
}