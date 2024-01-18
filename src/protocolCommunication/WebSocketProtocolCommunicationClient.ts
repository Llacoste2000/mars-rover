import { WebSocket } from "ws";
import { IProtocolCommunication } from "./ProtocolCommunication.interface";

const topicCommand = "command";

type MessageCallback = (message: string) => void;

export class WebSocketProtocolCommunicationClient implements IProtocolCommunication {

  private messages: MessageCallback[] = [];

  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket("ws://localhost:3000");

    this.socket.on("open", () => {
      console.log("connected");
    });

    this.socket.on("message", (message) => {
      this.receive(message.toString());
    });
  }

  send(message: string): void {
    this.socket.send(message);
  }

  receive(message: string): void {
    this.messages.forEach((callback) => callback(message));
  }

  onReceiveMessage(callback: (message: string) => void): void {
    this.messages.push(callback);
  }
}
