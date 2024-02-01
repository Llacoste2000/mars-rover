import { REPEATER_CONNECTION_URL, REPEATER_SERVER_PORT } from "../core/configuration";
import { WebSocketProtocolCommunicationClient } from "../core/protocolCommunication/WebSocketProtocolCommunicationClient";
import { WebsocketProtocolCommunicationServer } from "../core/protocolCommunication/WebSocketProtocolCommunicationServer";
import { Repeater } from "../app/repeater/Repeater";

const protocolCommunicationServer = new WebsocketProtocolCommunicationServer(REPEATER_SERVER_PORT);
const protocolCommunicationClient = new WebSocketProtocolCommunicationClient(REPEATER_CONNECTION_URL);

const repeater = new Repeater(protocolCommunicationServer, protocolCommunicationClient);
