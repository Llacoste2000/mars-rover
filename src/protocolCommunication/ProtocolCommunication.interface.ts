export interface IProtocolCommunication {
  send(message: string): void;
  onReceiveMessage(callback: (message: string) => void): void;
}
