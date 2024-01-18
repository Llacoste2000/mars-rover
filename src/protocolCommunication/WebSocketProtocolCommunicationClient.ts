import { WebSocket } from "ws";
import { IProtocolCommunication, Message } from "./ProtocolCommunication.interface";

type MessageCallback = (message: Message) => void;

export class WebSocketProtocolCommunicationClient implements IProtocolCommunication {
  private messages: MessageCallback[] = [];

  private socket: WebSocket;

  constructor(url: string) {
    this.socket = new WebSocket(url);

    this.socket.on("open", () => {
      console.log("connected");
    });

    this.socket.on("message", (message) => {
      this.receive(message.toString());
    });
  }

  send(message: Message): void {
    console.error("client, send", message);
    this.socket.send(JSON.stringify(message));
  }

  receive(message: string): void {
    console.error("client, received", message);
    const parsedMessage = JSON.parse(message);
    this.messages.forEach((callback) => callback(parsedMessage));
  }

  onReceiveMessage(callback: MessageCallback): void {
    this.messages.push(callback);
  }
}
