import { Orientation } from "@Domain/topologie/Orientation";
import { Position } from "@Domain/topologie/Position";

export interface IRover {
  orientation: Orientation;
  position: Position;

  turnRight(): IRover;
  turnLeft(): IRover;
  forward(): IRover;
  backward(): IRover;

  toString(): string;
}
