import { IRover } from "../rover/Rover.interface";
import { RoverInterpreter } from "../roverInterpreter/RoverInterpreter";
import { IProtocolCommunication } from "./ProtocolCommunication.interface";

export class RemoteRover {
  constructor(
    private rover: IRover,
    protocolCommunication: IProtocolCommunication,
  ) {
    protocolCommunication.onReceiveMessage((message: string) => {
      const roverInterpreter = new RoverInterpreter(this.rover);
      this.rover = roverInterpreter.interpret(message);

      protocolCommunication.send(this.rover.toString());
    });
  }
}
