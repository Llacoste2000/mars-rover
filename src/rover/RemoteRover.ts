import { ObstacleError } from "../errors/ObstacleError";
import { IRover } from "./Rover.interface";
import { RoverInterpreter } from "../roverInterpreter/RoverInterpreter";
import { IProtocolCommunication } from "../protocolCommunication/ProtocolCommunication.interface";
import { Message, MessageCommand } from "../protocolCommunication/Message.interface";

export class RemoteRover {
  constructor(
    private rover: IRover,
    private readonly protocolCommunication: IProtocolCommunication,
  ) {
    protocolCommunication.onReceiveMessage((message) => this.onReceiveMessage(message));
  }

  private onReceiveMessage(message: Message) {
    if (!this.messageIsValid(message)) {
      return;
    }

    const roverInterpreter = new RoverInterpreter(this.rover);

    const [newRover, error] = roverInterpreter.interpret(message.data);

    this.rover = newRover;

    this.protocolCommunication.send({
      type: "positionAndOrientation",
      data: {
        position: this.rover.position.toJson(),
        orientationLetter: this.rover.orientation.toString(),
      },
    });

    if (error) {
      this.sendError(error);
    }
  }

  private sendError(error: Error) {
    if (error instanceof ObstacleError) {
      return this.protocolCommunication.send({
        type: "obstacle",
        data: error.position.toJson(),
      });
    }

    return this.protocolCommunication.send({
      type: "error",
      data: error.message,
    });
  }

  private messageIsValid(message: Message): message is MessageCommand {
    return message.type === "command" && typeof message.data === "string";
  }
}
