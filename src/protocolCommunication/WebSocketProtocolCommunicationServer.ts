import { Server } from "bun";
import { IProtocolCommunication } from "./ProtocolCommunication.interface";
import { Message } from "./Message.interface";

const topicCommand = "command";

type MessageCallback = (message: Message) => void;

export class WebsocketProtocolCommunicationServer implements IProtocolCommunication {
  private readonly server: Server;

  private messages: MessageCallback[] = [];

  constructor(port: number) {
    this.server = Bun.serve({
      fetch(req, server) {
        const success = server.upgrade(req);
        if (success) {
          // Bun automatically returns a 101 Switching Protocols
          // if the upgrade succeeds
          return undefined;
        }

        // handle HTTP request normally
        return new Response("Hello world!");
      },
      websocket: {
        open(ws) {
          console.log("Client connected");

          ws.subscribe(topicCommand);
        },
        message: async (_ws, message) => {
          this.receive(message.toString());
        },
      },
      port: port,
    });

    console.log(`Listening on ${this.server.hostname}:${this.server.port}`);
  }

  send(message: Message): void {
    console.error("server, send", message);
    this.server.publish(topicCommand, JSON.stringify(message));
  }

  receive(message: string): void {
    console.error("server, received", message);
    const parsedMessage = JSON.parse(message);
    this.messages.forEach((callback) => callback(parsedMessage));
  }

  onReceiveMessage(callback: (message: Message) => void): void {
    this.messages.push(callback);
  }
}
