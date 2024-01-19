import { IPlanetUi } from "../PlanetUi/PlanetUi.interface";
import { Message } from "../protocolCommunication/Message.interface";
import { IProtocolCommunication } from "../protocolCommunication/ProtocolCommunication.interface";
import { Integer } from "../topologie/Integer";
import { Orientation } from "../topologie/Orientation";
import { Position } from "../topologie/Position";
import { OrientationFactory } from "../topologie/OrientationFactory";

export class MissionControl {
  constructor(
    private readonly protocolCommunication: IProtocolCommunication,
    private planetUi: IPlanetUi,
  ) {
    protocolCommunication.onReceiveMessage((message: Message) => {
      this.updateUi(message);
    });
  }

  public send(command: string) {
    this.protocolCommunication.send({
      type: "command",
      data: command,
    });
  }

  private updateUi(message: Message) {
    if (message.type === "positionAndOrientation") {
      const newPosition = new Position(new Integer(message.data.position.x), new Integer(message.data.position.y));
      const newOrientation = OrientationFactory.createOrientation(message.data.orientationLetter);
      this.planetUi = this.planetUi.newRoverPositionAndOrientation(newPosition, newOrientation);
    } else if (message.type === "obstacle") {
      this.planetUi = this.planetUi.addObstaclePosition(
        new Position(new Integer(message.data.x), new Integer(message.data.y)),
      );
    }

    this.planetUi.display();
  }
}
