import { MissionControl } from "./missionControl/MissionControl";
import { WebSocketProtocolCommunicationClient } from "./protocolCommunication/WebSocketProtocolCommunicationClient";
import { UserInputThread } from "./userInputThread/userInputThread";

const websocketProtocolCommunicationClient = new WebSocketProtocolCommunicationClient();

const missionControl = new MissionControl(websocketProtocolCommunicationClient);

new UserInputThread((message) => {
  missionControl.send(message);
});
