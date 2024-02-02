import { WebSocket } from "ws";
import { WebsocketProtocolAbstract } from "./WebsocketProtocolAbstract";

export class WebSocketProtocolCommunicationClient extends WebsocketProtocolAbstract {
  constructor(url: string) {
    const socket = new WebSocket(url);

    socket.on("open", () => {
      // console.log("connected");
    });

    socket.on("message", (message) => {
      this.receive(message.toString());
    });

    super(socket);
  }
}
