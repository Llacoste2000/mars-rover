import { Position } from "./Position";
import { IPlanet } from "./Planet.interface";

// Objet-valeur
export class PlanetInfinite implements IPlanet {
  public normalize(position: Position) {
    return position;
  }

  public isPositionAvailable(_position: Position): boolean {
    return true;
  }
}
