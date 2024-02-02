import { Message } from "./Message.interface";

export interface IProtocolCommunication {
  send(message: Message): void;
  receive(message: string): void;
  onReceiveMessage(callback: (message: Message) => void): void;
}
