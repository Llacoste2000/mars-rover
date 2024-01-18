import { Server } from "bun";
import { IProtocolCommunication } from "./ProtocolCommunication.interface";

const topicCommand = "command";

type MessageCallback = (message: string) => void;

export class WebsocketProtocolCommunication implements IProtocolCommunication {
  private readonly server: Server;

  private messages: MessageCallback[] = [];

  constructor() {
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
      port: 3000,
    });

    console.log(`Listening on ${this.server.hostname}:${this.server.port}`);
  }

  send(message: string): void {
    this.server.publish(topicCommand, message);
  }

  receive(message: string): void {
    this.messages.forEach((callback) => callback(message));
  }

  onReceiveMessage(callback: (message: string) => void): void {
    this.messages.push(callback);
  }
}
