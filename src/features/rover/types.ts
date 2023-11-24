export interface IRover {
  orientation: Orientation;
  position: Position;

  tournerADroite(): IRover;
  tournerAGauche(): IRover;
  avancer(): IRover;
  reculer(): IRover;
}

export const EOrientation = {
  N: "N",
  S: "S",
  E: "E",
  W: "W",
} as const;
export type Orientation = (typeof EOrientation)[keyof typeof EOrientation];

export interface Position {
  X: number;
  Y: number;
}
