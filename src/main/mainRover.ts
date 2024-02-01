import { WebsocketProtocolCommunicationServer } from "../core/protocolCommunication/WebSocketProtocolCommunicationServer";
import { RemoteRover } from "../app/rover/RemoteRover";
import { IRover } from "../app/rover/Rover.interface";
import { RoverBuilder } from "../app/rover/RoverBuilder";
import { INITIAL_ROVER_ORIENTATION, INITIAL_ROVER_POSITION, PLANET, ROVER_SERVER_PORT } from "../core/configuration";

try {
  const protocolCommunicationServer = new WebsocketProtocolCommunicationServer(ROVER_SERVER_PORT);

  const rover: IRover = new RoverBuilder()
    .onPlanet(PLANET)
    .withPosition(INITIAL_ROVER_POSITION)
    .oriented(INITIAL_ROVER_ORIENTATION)
    .build();

  const remoteRover = new RemoteRover(rover, protocolCommunicationServer);
} catch (error) {
  console.error((error as Error).message);
  process.exit(1);
}
