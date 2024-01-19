import { REPEATER_CONNECTION_URL, REPEATER_SERVER_PORT } from "./configuration";
import { WebSocketProtocolCommunicationClient } from "./protocolCommunication/WebSocketProtocolCommunicationClient";
import { WebsocketProtocolCommunicationServer } from "./protocolCommunication/WebSocketProtocolCommunicationServer";
import { Repeater } from "./repeater/Repeater";

const protocolCommunicationServer = new WebsocketProtocolCommunicationServer(REPEATER_SERVER_PORT);
const protocolCommunicationClient = new WebSocketProtocolCommunicationClient(REPEATER_CONNECTION_URL);

const repeater = new Repeater(protocolCommunicationServer, protocolCommunicationClient);
