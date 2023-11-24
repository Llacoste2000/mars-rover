export interface IRover {
  orientation: Orientation;
  position: Position;

  turnRight(): void;
  turnLeft(): void;
  forward(): void;
  backward(): void;
}

export const EOrientation = {
  N: "N",
  S: "S",
  E: "E",
  W: "W",
} as const;
export type Orientation = (typeof EOrientation)[keyof typeof EOrientation];
export const orientations = Object.values(EOrientation)

export interface Position {
  x: number;
  y: number;
}
