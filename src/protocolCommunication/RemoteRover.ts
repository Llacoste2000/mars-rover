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
        data: this.rover.position.toJson(),
      });

      if (error) {
        if (error instanceof ObstacleError) {
          protocolCommunication.send({
            type: "obstacle",
            data: error.position.toJson(),
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
