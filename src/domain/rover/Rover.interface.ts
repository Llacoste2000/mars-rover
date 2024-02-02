import { Orientation } from "@Domaintopologie/Orientation";
import { Position } from "@Domaintopologie/Position";

export interface IRover {
  orientation: Orientation;
  position: Position;

  turnRight(): IRover;
  turnLeft(): IRover;
  forward(): IRover;
  backward(): IRover;

  toString(): string;
}
