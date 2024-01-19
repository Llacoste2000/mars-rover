import { IPlanetUi } from "../PlanetUi/PlanetUi.interface";
import { Message } from "../protocolCommunication/Message.interface";
import { IProtocolCommunication } from "../protocolCommunication/ProtocolCommunication.interface";
import { Integer } from "../topologie/Integer";
import { Position } from "../topologie/Position";

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
    if (message.type === "position") {
      this.planetUi = this.planetUi.newRoverPosition(
        new Position(new Integer(message.data.x), new Integer(message.data.y)),
      );
    } else if (message.type === "obstacle") {
      this.planetUi = this.planetUi.addObstaclePosition(
        new Position(new Integer(message.data.x), new Integer(message.data.y)),
      );
    }

    this.planetUi.display();
  }
}
