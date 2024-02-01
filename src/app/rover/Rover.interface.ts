import { Orientation } from "@Core/topologie/Orientation";
import { Position } from "@Core/topologie/Position";

export interface IRover {
  orientation: Orientation;
  position: Position;

  turnRight(): IRover;
  turnLeft(): IRover;
  forward(): IRover;
  backward(): IRover;

  toString(): string;
}
