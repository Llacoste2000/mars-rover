import { IRover } from "./Rover.interface";
import { RoverInterpreter } from "@Domain/roverInterpreter/RoverInterpreter";
import { IProtocolCommunication } from "@Infrastructure/protocolCommunication/ProtocolCommunication.interface";
import { Message, MessageCommand } from "@Infrastructure/protocolCommunication/Message.interface";
import { ObstacleError } from "@Infrastructure/errors/ObstacleError";

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

    const { roverHistory, currentRover, error } = roverInterpreter.interpret(message.data);

    this.rover = currentRover;

    this.protocolCommunication.send({
      type: "positionsAndOrientations",
      data: roverHistory.map((rover) => ({
        position: rover.position.toJson(),
        orientationLetter: rover.orientation.toString(),
      })),
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
