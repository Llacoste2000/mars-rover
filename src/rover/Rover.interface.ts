import { Orientation } from "../topologie/Orientation";
import { Position } from "../topologie/Position";

export interface IRover {
  orientation: Orientation;
  position: Position;

  turnRight(): IRover;
  turnLeft(): IRover;
  forward(): IRover;
  backward(): IRover;
}

