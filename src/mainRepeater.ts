import { WebsocketProtocolCommunicationServer } from "./protocolCommunication/WebSocketProtocolCommunicationServer";
import { WebSocketProtocolCommunicationClient } from "./protocolCommunication/WebSocketProtocolCommunicationClient";
import { Repeater } from "./repeater/Repeater";

const protocolCommunicationServer = new WebsocketProtocolCommunicationServer(3001);
const protocolCommunicationClient = new WebSocketProtocolCommunicationClient("ws://localhost:3000");

const repeater = new Repeater(protocolCommunicationServer, protocolCommunicationClient);
