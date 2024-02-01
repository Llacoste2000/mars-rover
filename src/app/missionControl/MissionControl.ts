import { IPlanetUi } from "@Core/PlanetUi/PlanetUi.interface";
import { Message } from "@Core/protocolCommunication/Message.interface";
import { IProtocolCommunication } from "@Core/protocolCommunication/ProtocolCommunication.interface";
import { Integer } from "@Core/topologie/Integer";
import { OrientationFactory } from "@Core/topologie/OrientationFactory";
import { Position } from "@Core/topologie/Position";

export class MissionControl {
  constructor(
    private readonly _protocolCommunication: IProtocolCommunication,
    private _planetUi: IPlanetUi,
  ) {
    _protocolCommunication.onReceiveMessage((message: Message) => {
      this.updateUi(message);
    });

    this._planetUi.display();
  }

  public send(command: string) {
    this._protocolCommunication.send({
      type: "command",
      data: command,
    });
  }

  private updateUi(message: Message) {
    if (message.type === "positionsAndOrientations") {
      message.data.forEach((positionAndOrientation) => {
        const newPosition = new Position(
          new Integer(positionAndOrientation.position.x),
          new Integer(positionAndOrientation.position.y),
        );
        const newOrientation = OrientationFactory.createOrientation(positionAndOrientation.orientationLetter);
        this._planetUi = this._planetUi.newRoverPositionAndOrientation(newPosition, newOrientation);
      });
    } else if (message.type === "obstacle") {
      this._planetUi = this._planetUi.addObstaclePosition(
        new Position(new Integer(message.data.x), new Integer(message.data.y)),
      );
    }

    this._planetUi.display();
  }
}