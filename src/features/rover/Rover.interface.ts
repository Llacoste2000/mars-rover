import { Orientation } from "../orientation/Orientation";
import { Position } from "../position/Position";

export interface IRover {
  orientation: Orientation;
  position: Position;

  turnRight(): IRover;
  turnLeft(): IRover;
  forward(): IRover;
  backward(): IRover;
}

