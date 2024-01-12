import { MissionControl } from "./missionControl/MissionControl";
import { WebsocketProtocolCommunication } from "./protocolCommunication/WebsocketProtocolCommunication";
import { UserInputThread } from "./userInputThread/userInputThread";

const websocketProtocolCommunication = new WebsocketProtocolCommunication();
const missionControl = new MissionControl(websocketProtocolCommunication);

new UserInputThread((message) => {
  missionControl.send(message);
});
