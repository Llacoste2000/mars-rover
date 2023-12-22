import { Position } from "../position/Position"

export interface IPlanet {
  normalize: (position: Position) => Position
  isPositionAvailable: (position: Position) => boolean
}