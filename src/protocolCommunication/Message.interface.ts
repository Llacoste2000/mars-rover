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
  type: "position";
  data: { x: number; y: number };
};

export type MessageError = {
  type: "error";
  data: string;
};
