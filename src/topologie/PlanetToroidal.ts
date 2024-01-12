import { Integer } from "./Integer";
import { Position } from "./Position";
import { IPlanet } from "./Planet.interface";

// Objet-valeur
export class PlanetToroidal implements IPlanet {

  constructor(public size: Position) {
    if (size.x.lessThan(Integer.zero) || size.y.lessThan(Integer.zero)) {
      throw new Error("Size must be positive");
    }

    this.size = size;
  }

  public normalize(position: Position) {
    const converterX = position.x.lessThan(Integer.zero) ? position.x.add(this.size.x) : position.x
    const converterY = position.y.lessThan(Integer.zero) ? position.y.add(this.size.y) : position.y

    return new Position(converterX.modulo(this.size.x), converterY.modulo(this.size.y));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public isPositionAvailable(_position: Position): boolean {
    return true;
  }
}