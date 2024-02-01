import { Orientation } from "../topologie/Orientation";
import { Position } from "../topologie/Position";

export interface IPlanetUi {
  display: () => void;
  newRoverPositionAndOrientation: (position: Position, orientation: Orientation) => IPlanetUi;
  addObstaclePosition: (position: Position) => IPlanetUi;
}
