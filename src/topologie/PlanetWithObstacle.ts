import { Position } from "./Position";
import { IPlanet } from "./Planet.interface";

// Objet-valeur
export class PlanetWithObstacle implements IPlanet {
  constructor(private readonly planet: IPlanet, private readonly obstacles: Position[]) { }

  public normalize(position: Position) {
    return this.planet.normalize(position);
  }

  public isPositionAvailable(position: Position): boolean {
    return !this.obstacles.some(obstacle => obstacle.equals(position));
  }
}