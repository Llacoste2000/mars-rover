import { Position } from "../rover/types";

export interface IPlanet {
  normalize: (position: Position) => Position
}