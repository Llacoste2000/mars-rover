import { Position } from "../position/Position";
import { IPlanet } from "./Planet.interface";

export class PlanetToroidal implements IPlanet {
  public size: Position;

  constructor(size: Position) {
    if (size.x < 0 || size.y < 0) {
      throw new Error("Size must be positive");
    }

    this.size = size;
  }
  public normalize(position: Position) {
    const converterX = position.x < 0 ? position.x + this.size.x : position.x
    const converterY = position.y < 0 ? position.y + this.size.y : position.y

    return { x: converterX % this.size.x, y: converterY % this.size.y };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public isObstacle(_position: Position): boolean {
    return false;
  }
}