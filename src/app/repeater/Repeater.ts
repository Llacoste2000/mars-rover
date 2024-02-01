import { WebsocketProtocolCommunicationServer } from "@Core/protocolCommunication/WebSocketProtocolCommunicationServer";
import { WebSocketProtocolCommunicationClient } from "@Core/protocolCommunication/WebSocketProtocolCommunicationClient";

export class Repeater {
  constructor(
    protocolCommunicationServer: WebsocketProtocolCommunicationServer,
    protocolCommunicationClient: WebSocketProtocolCommunicationClient,
  ) {
    protocolCommunicationClient.onReceiveMessage((message) => {
      console.log(`Message <${JSON.stringify(message)}> received from rover, relaying it...`);
      protocolCommunicationServer.send(message);
    });

    protocolCommunicationServer.onReceiveMessage((message) => {
      console.log(`Message <${JSON.stringify(message)}> received from the missionControl, relaying it...`);
      protocolCommunicationClient.send(message);
    });
  }
}
