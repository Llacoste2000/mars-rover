import { IProtocolCommunication, Message } from "../protocolCommunication/ProtocolCommunication.interface";
import { Integer } from "../topologie/Integer";
import { Position } from "../topologie/Position";
import { PlanetUiBuilder } from "./PlanetUiBuilder";

const PLANET_SIZE = new Position(new Integer(5), new Integer(5));

export class MissionControl {
  private planetUi = new PlanetUiBuilder().withPlanetSize(PLANET_SIZE).build();
  constructor(private readonly protocolCommunication: IProtocolCommunication) {
    protocolCommunication.onReceiveMessage((message: Message) => {
      console.log(message);

      this.updateUi(message);

      this.planetUi.display();
    });
  }

  send(command: string) {
    this.protocolCommunication.send({
      type: "command",
      data: command,
    });
  }

  private updateUi(message: Message) {
    if (message.type === "position") {
      this.planetUi = this.planetUi.updateRoverPosition(
        new Position(new Integer(message.data.x), new Integer(message.data.y)),
      );
    } else if (message.type === "obstacle") {
      this.planetUi = this.planetUi.addObstaclePosition(
        new Position(new Integer(message.data.x), new Integer(message.data.y)),
      );
    }
  }
}
