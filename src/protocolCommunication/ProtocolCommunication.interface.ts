export interface IProtocolCommunication {
  send(message: string): void;
  receive(message: string): void;
}
