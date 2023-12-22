import { Position } from "../position/Position";
import { IPlanet } from "./Planet.interface";

// Objet-valeur
export class PlanetToroidal implements IPlanet {

  constructor(public size: Position) {
    if (size.x < 0 || size.y < 0) {
      throw new Error("Size must be positive");
    }

    this.size = size;
  }

  public normalize(position: Position) {
    const converterX = position.x < 0 ? position.x + this.size.x : position.x
    const converterY = position.y < 0 ? position.y + this.size.y : position.y

    return new Position(converterX % this.size.x, converterY % this.size.y);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public isPositionAvailable(_position: Position): boolean {
    return true;
  }
}