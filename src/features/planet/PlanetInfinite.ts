import { Position } from "../rover/types";
import { IPlanet } from "./Planet.interface";

export class InfinitePlanet implements IPlanet {
  public normalize(position: Position) {
    return position;
  }
}