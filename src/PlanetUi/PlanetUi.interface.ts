import { Position } from "../topologie/Position";

export interface IPlanetUi {
  display: () => void;
  newRoverPosition: (position: Position) => IPlanetUi;
  addObstaclePosition: (position: Position) => IPlanetUi;
}
