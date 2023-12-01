import { Position } from "../rover/types";

export interface IPlanet {
  size: Position
  normalize: (position: Position) => Position
}