import { Orientation } from "../orientation/Orientation";

export interface IRover {
  orientation: Orientation;
  position: Position;

  turnRight(): this;
  turnLeft(): this;
  forward(): this;
  backward(): this;
}

export interface Position {
  x: number;
  y: number;
}
