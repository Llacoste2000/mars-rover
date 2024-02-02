import { Position } from "@Domain/topologie/Position";

export class ObstacleError extends Error {
  constructor(public readonly position: Position) {
    super(`Il y a un obstacle à la position ${position.toString()}`);
  }
}
