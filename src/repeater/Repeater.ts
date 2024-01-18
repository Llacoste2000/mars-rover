import { WebsocketProtocolCommunication } from "../protocolCommunication/WebSocketProtocolCommunication";
import { WebSocketProtocolCommunicationClient } from "../protocolCommunication/WebSocketProtocolCommunicationClient";

export class Repeater {
  constructor(
    protocolCommunicationServer: WebsocketProtocolCommunication,
    protocolCommunicationClient: WebSocketProtocolCommunicationClient,
  ) {
    protocolCommunicationClient.onReceiveMessage((message) => {
      console.log(`Message <${message}> received from rover, relaying it...`);
      protocolCommunicationServer.send(message);
    });

    protocolCommunicationServer.onReceiveMessage((message) => {
      console.log(`Message <${message}> received from the missionControl, relaying it...`);
      protocolCommunicationClient.send(message);
    });
  }
}
