import { MissionControl } from "./missionControl/MissionControl";
import { WebSocketProtocolCommunicationClient } from "./protocolCommunication/WebSocketProtocolCommunicationClient";
import { UserInputThread } from "./userInputThread/userInputThread";
import {
  INITIAL_ROVER_ORIENTATION,
  INITIAL_ROVER_POSITION,
  MISSION_CONTROL_CONNECTION_URL,
  PLANET_SIZE,
} from "./configuration";
import { PlanetUiBuilder } from "./PlanetUi/PlanetUiBuilder";
import { Position } from "./topologie/Position";
import { Integer } from "./topologie/Integer";

const protocolCommunicationClient = new WebSocketProtocolCommunicationClient(MISSION_CONTROL_CONNECTION_URL);

const planetUiConsole = new PlanetUiBuilder()
  .withPlanetSize(PLANET_SIZE)
  .withRoverPosition(INITIAL_ROVER_POSITION)
  .withRoverOrientation(INITIAL_ROVER_ORIENTATION)
  .build();

const missionControl = new MissionControl(protocolCommunicationClient, planetUiConsole);

new UserInputThread((message) => {
  missionControl.send(message);
});
