import { WebsocketProtocolAbstract, topicCommand } from "./WebsocketProtocolAbstract";

export class WebsocketProtocolCommunicationServer extends WebsocketProtocolAbstract {
  constructor(port: number) {
    const socket = Bun.serve({
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
          // console.log("Client connected");

          ws.subscribe(topicCommand);
        },
        message: async (_ws, message) => {
          this.receive(message.toString());
        },
      },
      port: port,
    });

    super(socket);

    console.log(`Listening on ${socket.hostname}:${socket.port}`);
  }
}
