import { Orientation } from "../../core/topologie/Orientation";
import { Position } from "../../core/topologie/Position";

export interface IRover {
  orientation: Orientation;
  position: Position;

  turnRight(): IRover;
  turnLeft(): IRover;
  forward(): IRover;
  backward(): IRover;

  toString(): string;
}
