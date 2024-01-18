export interface IProtocolCommunication {
  send(message: Message): void;
  onReceiveMessage(callback: (message: Message) => void): void;
}

export type Message = {
  type: string;
  data: any; // TODO: CHANGE THIS ANY
};

export type MessageCommand = {
  type: "command";
  data: string;
};
