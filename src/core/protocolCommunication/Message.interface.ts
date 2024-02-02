import { OrientationLetter } from "../topologie/Orientation";

export type Message =
  | MessageCommand
  | MessageObstacle
  | MessagePosition
  | MessageError
  | MessageGetRover
  | MessageRoverState;

export type MessageCommand = {
  type: "command";
  data: string;
};

type MessageObstacle = {
  type: "obstacle";
  data: { x: number; y: number };
};

type MessagePosition = {
  type: "positionsAndOrientations";
  data: {
    position: { x: number; y: number };
    orientationLetter: OrientationLetter;
  }[];
};

type MessageGetRover = {
  type: "getRover";
};
type MessageRoverState = {
  type: "roverState";
  data: {
    position: { x: number; y: number };
    orientationLetter: OrientationLetter;
  };
};

type MessageError = {
  type: "error";
  data: string;
};
