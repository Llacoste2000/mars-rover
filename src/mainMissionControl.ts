import { MissionControl } from "./missionControl/MissionControl";
import { WebSocketProtocolCommunicationClient } from "./protocolCommunication/WebSocketProtocolCommunicationClient";
import { UserInputThread } from "./userInputThread/userInputThread";

const protocolCommunicationClient = new WebSocketProtocolCommunicationClient("ws://localhost:3001");

const missionControl = new MissionControl(protocolCommunicationClient);

new UserInputThread((message) => {
  missionControl.send(message);
});
