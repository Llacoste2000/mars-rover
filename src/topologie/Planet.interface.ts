import { Position } from "./Position"

export interface IPlanet {
  normalize: (position: Position) => Position
  isPositionAvailable: (position: Position) => boolean
}