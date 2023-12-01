import { Position } from "../rover/types";
import { IPlanet } from "./Planet.interface";

export class PlanetToroidal implements IPlanet {
  public size: Position;

  constructor(size: Position) {
    this.size = size;
  }
  public normalize(position: Position) {
    return { x: position.x % this.size.x, y: position.y % this.size.y };
  }
}