import { WebsocketProtocolCommunicationServer } from "./protocolCommunication/WebSocketProtocolCommunicationServer";
import { RemoteRover } from "./protocolCommunication/RemoteRover";
import { IRover } from "./rover/Rover.interface";
import { RoverBuilder } from "./rover/RoverBuilder";

const protocolCommunicationServer = new WebsocketProtocolCommunicationServer(3000);

const rover: IRover = new RoverBuilder().build();

const remoteRover = new RemoteRover(rover, protocolCommunicationServer);
