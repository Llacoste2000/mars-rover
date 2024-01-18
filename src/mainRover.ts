import { WebsocketProtocolCommunication } from "./protocolCommunication/WebSocketProtocolCommunication";
import { RemoteRover } from "./protocolCommunication/RemoteRover";
import { IRover } from "./rover/Rover.interface";
import { RoverBuilder } from "./rover/RoverBuilder";

const websocketProtocolCommunication = new WebsocketProtocolCommunication(3000);

const rover: IRover = new RoverBuilder().build();

const remoteRover = new RemoteRover(rover, websocketProtocolCommunication);
