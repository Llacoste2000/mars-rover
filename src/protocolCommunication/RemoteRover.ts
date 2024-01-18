import { IRover } from "../rover/Rover.interface";
import { RoverInterpreter } from "../roverInterpreter/RoverInterpreter";
import { IProtocolCommunication } from "./ProtocolCommunication.interface";

export class RemoteRover {
  constructor(private rover: IRover, protocolCommunication: IProtocolCommunication) {
    protocolCommunication.onReceiveMessage((message: string) => {

      console.log(`Received: ${message}`);

      const roverInterpreter = new RoverInterpreter(this.rover);

      this.rover = roverInterpreter.interpret(message);

      console.log(this.rover.toString());

      protocolCommunication.send(this.rover.toString());
    });
  }
}
