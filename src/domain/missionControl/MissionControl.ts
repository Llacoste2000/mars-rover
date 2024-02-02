import { IPlanetUi } from "@Infrastructure/PlanetUi/PlanetUi.interface";
import { Message, MessageObstacle, MessagePosition } from "@Infrastructure/protocolCommunication/Message.interface";
import { IProtocolCommunication } from "@Infrastructure/protocolCommunication/ProtocolCommunication.interface";
import { Integer } from "@Domain/topologie/Integer";
import { OrientationFactory } from "@Domain/topologie/OrientationFactory";
import { Position } from "@Domain/topologie/Position";

export class MissionControl {
  constructor(
    private readonly _protocolCommunication: IProtocolCommunication,
    private _planetUi: IPlanetUi,
  ) {
    _protocolCommunication.onReceiveMessage((message: Message) => {
      this.handleMessage(message);
    });

    this._planetUi.display();
  }

  public send(command: string) {
    this._protocolCommunication.send({
      type: "command",
      data: command,
    });
  }

  private handleMessage(message: Message) {
    if (message.type === "positionsAndOrientations") {
      this.handlePositionsAndOrientationsMessage(message);
    } else if (message.type === "obstacle") {
      this.handleObstacleMessage(message);
    }

    this._planetUi.display();
  }

  private handlePositionsAndOrientationsMessage(message: MessagePosition) {
    message.data.forEach((positionAndOrientation) => {
      const newPosition = new Position(
        new Integer(positionAndOrientation.position.x),
        new Integer(positionAndOrientation.position.y),
      );
      const newOrientation = OrientationFactory.createOrientation(positionAndOrientation.orientationLetter);

      this._planetUi = this._planetUi.newRoverPositionAndOrientation(newPosition, newOrientation);
    });
  }

  private handleObstacleMessage(message: MessageObstacle) {
    this._planetUi = this._planetUi.addObstaclePosition(
      new Position(new Integer(message.data.x), new Integer(message.data.y)),
    );
  }
}
