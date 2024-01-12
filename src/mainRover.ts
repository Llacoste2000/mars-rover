import { WebSocket } from "ws";
import { RoverBuilder } from "./rover/RoverBuilder";
import { RoverInterpreter } from "./roverInterpreter/RoverInterpreter";
import { IRover } from "./rover/Rover.interface";
import { WebsocketProtocolCommunication } from "./protocolCommunication/WebsocketProtocolCommunication";
import { RemoteRover } from "./protocolCommunication/remoteRover";

const rover: IRover = new RoverBuilder().build();

console.log(rover.toString());

const remoteRover = new RemoteRover(rover);
