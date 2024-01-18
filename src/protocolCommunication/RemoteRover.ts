import { ObstacleError } from "../errors/ObstacleError";
import { IRover } from "../rover/Rover.interface";
import { RoverInterpreter } from "../roverInterpreter/RoverInterpreter";
import { IProtocolCommunication, Message, MessageCommand } from "./ProtocolCommunication.interface";

export class RemoteRover {
  constructor(
    private rover: IRover,
    protocolCommunication: IProtocolCommunication,
  ) {
    protocolCommunication.onReceiveMessage((message: Message) => {
      if (!this.messageIsValid(message)) {
        return;
      }

      const roverInterpreter = new RoverInterpreter(this.rover);

      const [newRover, error] = roverInterpreter.interpret(message.data);

      this.rover = newRover;

      protocolCommunication.send({
        type: "position",
        data: { x: this.rover.position.x.toNumber(), y: this.rover.position.y.toNumber() },
      });

      if (error) {
        if (error instanceof ObstacleError) {
          protocolCommunication.send({
            type: "obstacle",
            data: { x: error.position.x.toNumber(), y: error.position.y.toNumber() },
          });
        }

        if (error instanceof Error) {
          protocolCommunication.send({
            type: "error",
            data: error.message,
          });
        }
      }
    });
  }

  messageIsValid(message: Message): message is MessageCommand {
    return message.type === "command" && typeof message.data === "string";
  }
}
