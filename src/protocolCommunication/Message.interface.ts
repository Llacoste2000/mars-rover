import { OrientationLetter } from "../topologie/Orientation";

export type Message = MessageCommand | MessageObstacle | MessagePosition | MessageError;

export type MessageCommand = {
  type: "command";
  data: string;
};

export type MessageObstacle = {
  type: "obstacle";
  data: { x: number; y: number };
};

export type MessagePosition = {
  type: "positionsAndOrientations";
  data: {
    position: { x: number; y: number };
    orientationLetter: OrientationLetter;
  }[];
};

export type MessageError = {
  type: "error";
  data: string;
};
