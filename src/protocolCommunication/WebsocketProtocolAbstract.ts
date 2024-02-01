import { Server } from "bun";
import { IProtocolCommunication } from "./ProtocolCommunication.interface";
import { Message } from "./Message.interface";
import { WebSocket } from "ws";

type MessageCallback = (message: Message) => void;

export const topicCommand = "command";

export class WebsocketProtocolAbstract implements IProtocolCommunication {
  private readonly _messages: MessageCallback[] = [];

  constructor(private readonly _socket: WebSocket | Server) {}

  public send(message: Message): void {
    const data = JSON.stringify(message);

    if (this._socket instanceof WebSocket) {
      this._socket.send(data);
      return;
    }

    this._socket.publish(topicCommand, data);
  }

  public receive(message: string): void {
    const parsedMessage = JSON.parse(message);

    this._messages.forEach((callback) => {
      callback(parsedMessage);
    });
  }

  public onReceiveMessage(callback: (message: Message) => void): void {
    this._messages.push(callback);
  }
}
