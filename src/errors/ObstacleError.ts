import { Position } from "../topologie/Position";

export class ObstacleError extends Error {
  constructor(public readonly position: Position) {
    super("obstacle");
  }
}
