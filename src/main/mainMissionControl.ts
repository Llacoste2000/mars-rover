import { MissionControl } from "@Domain/missionControl/MissionControl";
import { WebSocketProtocolCommunicationClient } from "@Infrastructure/protocolCommunication/WebSocketProtocolCommunicationClient";
import { UserInputThread } from "@Infrastructure/userInputThread/userInputThread";
import {
  INITIAL_ROVER_ORIENTATION,
  INITIAL_ROVER_POSITION,
  MISSION_CONTROL_CONNECTION_URL,
  PLANET_SIZE,
} from "@Infrastructure/configuration";
import { PlanetUiBuilder } from "@Infrastructure/PlanetUi/PlanetUiBuilder";

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
