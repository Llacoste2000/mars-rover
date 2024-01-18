import { IProtocolCommunication } from "../protocolCommunication/ProtocolCommunication.interface";

export class MissionControl {
  constructor(private readonly protocolCommunication: IProtocolCommunication) {
    protocolCommunication.onReceiveMessage((message: string) => {
      console.log(message);
    })
  }

  send(command: string) {
    this.protocolCommunication.send(command);
  }
}
