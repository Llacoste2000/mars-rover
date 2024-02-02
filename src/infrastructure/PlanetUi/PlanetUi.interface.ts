import { Orientation } from "@Domain//topologie/Orientation";
import { Position } from "@Domain//topologie/Position";

export interface IPlanetUi {
  display: () => void;
  newRoverPositionAndOrientation: (position: Position, orientation: Orientation) => IPlanetUi;
  addObstaclePosition: (position: Position) => IPlanetUi;
}
