import { REPEATER_CONNECTION_URL, REPEATER_SERVER_PORT } from "@Core/configuration";
import { WebSocketProtocolCommunicationClient } from "@Core/protocolCommunication/WebSocketProtocolCommunicationClient";
import { WebsocketProtocolCommunicationServer } from "@Core/protocolCommunication/WebSocketProtocolCommunicationServer";
import { Repeater } from "@App/repeater/Repeater";

const protocolCommunicationServer = new WebsocketProtocolCommunicationServer(REPEATER_SERVER_PORT);
const protocolCommunicationClient = new WebSocketProtocolCommunicationClient(REPEATER_CONNECTION_URL);

const repeater = new Repeater(protocolCommunicationServer, protocolCommunicationClient);
