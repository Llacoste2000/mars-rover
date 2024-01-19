import { Message } from "./Message.interface";

export interface IProtocolCommunication {
  send(message: Message): void;
  onReceiveMessage(callback: (message: Message) => void): void;
}
