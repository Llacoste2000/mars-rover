import { Position } from "../position/Position";
import { IPlanet } from "./Planet.interface";

// Objet-valeur
export class PlanetInfinite implements IPlanet {
  public normalize(position: Position) {
    return position;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public isPositionAvailable(_position: Position): boolean {
    return true;
  }
}