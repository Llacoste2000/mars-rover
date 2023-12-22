import { Position } from "../position/Position"

export interface IPlanet {
  normalize: (position: Position) => Position
  isObstacle: (position: Position) => boolean
}