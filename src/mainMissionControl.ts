import { MissionControl } from "./missionControl/MissionControl";
import { WebSocketProtocolCommunicationClient } from "./protocolCommunication/WebSocketProtocolCommunicationClient";
import { UserInputThread } from "./userInputThread/userInputThread";
import { MISSION_CONTROL_CONNECTION_URL } from "./configuration";

const protocolCommunicationClient = new WebSocketProtocolCommunicationClient(MISSION_CONTROL_CONNECTION_URL);

const missionControl = new MissionControl(protocolCommunicationClient);

new UserInputThread((message) => {
  missionControl.send(message);
});
