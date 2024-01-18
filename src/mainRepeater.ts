import { WebsocketProtocolCommunication } from "./protocolCommunication/WebSocketProtocolCommunication";
import { WebSocketProtocolCommunicationClient } from "./protocolCommunication/WebSocketProtocolCommunicationClient";
import { Repeater } from "./repeater/Repeater";

const protocolCommunication = new WebsocketProtocolCommunication(3001);
const protocolCommunicationClient = new WebSocketProtocolCommunicationClient("ws://localhost:3000");

const repeater = new Repeater(protocolCommunication, protocolCommunicationClient);
