import { REPEATER_CONNECTION_URL, REPEATER_SERVER_PORT } from "@Infrastructure/configuration";
import { WebSocketProtocolCommunicationClient } from "@Infrastructure/protocolCommunication/WebSocketProtocolCommunicationClient";
import { WebsocketProtocolCommunicationServer } from "@Infrastructure/protocolCommunication/WebSocketProtocolCommunicationServer";
import { Repeater } from "@Domain/repeater/Repeater";

const protocolCommunicationServer = new WebsocketProtocolCommunicationServer(REPEATER_SERVER_PORT);
const protocolCommunicationClient = new WebSocketProtocolCommunicationClient(REPEATER_CONNECTION_URL);

const repeater = new Repeater(protocolCommunicationServer, protocolCommunicationClient);
