import { Orientation } from "../orientation/Orientation";
import { Position } from "../position/Position";

export interface IRover {
  orientation: Orientation;
  position: Position;

  turnRight(): this;
  turnLeft(): this;
  forward(): this;
  backward(): this;
}

