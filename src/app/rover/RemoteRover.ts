import { Message } from "@Core/protocolCommunication/Message.interface";
import { IProtocolCommunication } from "@Core/protocolCommunication/ProtocolCommunication.interface";
import { Integer } from "@Core/topologie/Integer";
import { Orientation } from "@Core/topologie/Orientation";
import { OrientationFactory } from "@Core/topologie/OrientationFactory";
import { Position } from "@Core/topologie/Position";
import { IRover } from "./Rover.interface";

export class RemoteRover implements IRover {
  constructor(
    private readonly _protocolCommunication: IProtocolCommunication,
    private readonly positionHistory: Position[],
    private readonly orientationHistory: Orientation[],
  ) {}

  public get orientation(): Orientation {
    return this.orientationHistory[this.orientationHistory.length - 1];
  }
  public get position(): Position {
    return this.positionHistory[this.positionHistory.length - 1];
  }

  async init(): Promise<IRover> {
    return new Promise((resolve, reject) => {
      this._protocolCommunication.onReceiveMessage((message: Message) => {
        if (message.type === "roverState") {
          const position = new Position(new Integer(message.data.position.x), new Integer(message.data.position.y));
          const orientation = OrientationFactory.createOrientation(message.data.orientationLetter);
          resolve(new RemoteRover(this._protocolCommunication, [position], [orientation]));
        }
      });

      this._protocolCommunication.send({
        type: "getRover",
      });
    });
  }

  private async sendCommand(movement: string): Promise<IRover> {
    return new Promise((resolve, reject) => {
      this._protocolCommunication.onReceiveMessage((message: Message) => {
        if (message.type === "positionsAndOrientations") {
          message.data.forEach((positionAndOrientation) => {
            const newPosition = new Position(
              new Integer(positionAndOrientation.position.x),
              new Integer(positionAndOrientation.position.y),
            );
            const newOrientation = OrientationFactory.createOrientation(positionAndOrientation.orientationLetter);
            this.positionHistory.push(newPosition);
            this.orientationHistory.push(newOrientation);
          });

          resolve(new RemoteRover(this._protocolCommunication, this.positionHistory, this.orientationHistory));
        }
      });

      this._protocolCommunication.send({
        type: "command",
        data: movement,
      });
    });
  }

  public async turnRight(): Promise<IRover> {
    return this.sendCommand("R");
  }
  public async turnLeft(): Promise<IRover> {
    return this.sendCommand("L");
  }
  public async forward(): Promise<IRover> {
    return this.sendCommand("F");
  }
  public async backward(): Promise<IRover> {
    return this.sendCommand("B");
  }
  public toString() {
    return `Rover orienté ${this.orientation.toString()} à la position ${this.position.toString()}`;
  }
}
