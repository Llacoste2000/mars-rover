import { Position } from "./Position";
import { IPlanet } from "./Planet.interface";

// Objet-valeur
export class PlanetWithObstacle implements IPlanet {
  constructor(
    private readonly _planet: IPlanet,
    private readonly _obstacles: Position[],
  ) {}

  public normalize(position: Position) {
    return this._planet.normalize(position);
  }

  public isPositionAvailable(position: Position): boolean {
    return !this._obstacles.some((obstacle) => obstacle.equals(position));
  }
}
