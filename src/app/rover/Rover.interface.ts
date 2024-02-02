import { Orientation } from "@Core/topologie/Orientation";
import { Position } from "@Core/topologie/Position";

export interface IRover {
  orientation: Orientation;
  position: Position;

  turnRight(): Promise<IRover>;
  turnLeft(): Promise<IRover>;
  forward(): Promise<IRover>;
  backward(): Promise<IRover>;

  toString(): string;
}
