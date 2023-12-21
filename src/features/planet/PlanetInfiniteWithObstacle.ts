import { Position } from "../rover/types";
import { PlanetInfinite } from "./PlanetInfinite";

export class PlanetInfiniteWithObstacle extends PlanetInfinite {
  private obstacles: Position[] = [];

  constructor(obstacles: Position[]) {
    super();

    this.obstacles = obstacles;
  }

  public isObstacle(position: Position): boolean {
    return this.obstacles.some(obstacle => obstacle.x === position.x && obstacle.y === position.y);
  }
}