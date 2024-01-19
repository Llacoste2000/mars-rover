import { MissionControl } from "./missionControl/MissionControl";
import { WebSocketProtocolCommunicationClient } from "./protocolCommunication/WebSocketProtocolCommunicationClient";
import { UserInputThread } from "./userInputThread/userInputThread";
import { MISSION_CONTROL_CONNECTION_URL } from "./configuration";
import { PlanetUiBuilder } from "./PlanetUi/PlanetUiBuilder";
import { Position } from "./topologie/Position";
import { Integer } from "./topologie/Integer";

const protocolCommunicationClient = new WebSocketProtocolCommunicationClient(MISSION_CONTROL_CONNECTION_URL);

const PLANET_SIZE = new Position(new Integer(5), new Integer(5));

const planetUiConsole = new PlanetUiBuilder().withPlanetSize(PLANET_SIZE).build();

const missionControl = new MissionControl(protocolCommunicationClient, planetUiConsole);

new UserInputThread((message) => {
  missionControl.send(message);
});
