export interface IRover {
  orientation: Orientation;
  position: Position;

  turnRight(): IRover;
  turnLeft(): IRover;
  forward(): IRover;
  backward(): IRover;
}

export const EOrientation = {
  N: "N",
  S: "S",
  E: "E",
  W: "W",
} as const;
export type Orientation = (typeof EOrientation)[keyof typeof EOrientation];

export const orientations = [
  EOrientation.N,
  EOrientation.E,
  EOrientation.S,
  EOrientation.W,
];

export interface Position {
  x: number;
  y: number;
}
