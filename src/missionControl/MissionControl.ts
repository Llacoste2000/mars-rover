import { IProtocolCommunication } from "../protocolCommunication/ProtocolCommunication.interface";

export class MissionControl {
  constructor(private readonly protocolCommunication: IProtocolCommunication) {}

  send(command: string) {
    this.protocolCommunication.send(command);
  }
}
