import { Position } from "../rover/types";
import { IPlanet } from "./Planet.interface";

export class InfinitePlanet implements IPlanet {
  public size: Position;

  constructor(size: Position) {
    this.size = size;
  }

  public normalize(position: Position) {
    return position;
  }
}