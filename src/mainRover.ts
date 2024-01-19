import { WebsocketProtocolCommunicationServer } from "./protocolCommunication/WebSocketProtocolCommunicationServer";
import { RemoteRover } from "./rover/RemoteRover";
import { IRover } from "./rover/Rover.interface";
import { RoverBuilder } from "./rover/RoverBuilder";
import { PlanetToroidal } from "./topologie/PlanetToroidal";
import { Position } from "./topologie/Position";
import { Integer } from "./topologie/Integer";
import { PlanetWithObstacle } from "./topologie/PlanetWithObstacle";
import { ROVER_SERVER_PORT } from "./configuration";

const protocolCommunicationServer = new WebsocketProtocolCommunicationServer(ROVER_SERVER_PORT);

const planet = new PlanetWithObstacle(new PlanetToroidal(new Position(new Integer(5), new Integer(5))), [
  new Position(new Integer(2), new Integer(2)),
]);

const rover: IRover = new RoverBuilder().onPlanet(planet).build();

const remoteRover = new RemoteRover(rover, protocolCommunicationServer);
