import { Integer } from "@Domain/topologie/Integer";
import { Orientation } from "@Domain/topologie/Orientation";
import { Position } from "@Domain/topologie/Position";
import { IPlanetUi } from "./PlanetUi.interface";
import { Message } from "@Infrastructure/protocolCommunication/Message.interface";

export class PlanetUiConsole implements IPlanetUi {
  constructor(
    private readonly _planetSize: Position,
    private readonly _obstaclesPositions: Position[],
    private readonly _roverPosition: Position,
    private readonly _roverOrientation: Orientation,
    private readonly _discoveredPositions: Position[],
  ) {}

  public display() {
    console.log("========================");
    for (let columnIndex = this._planetSize.y.toNumber() - 1; columnIndex >= 0; columnIndex--) {
      console.log(this.generateLine(columnIndex));
    }
    console.log("========================");
  }

  private generateLine(columnIndex: number) {
    let line = "";
    for (let rowIndex = 0; rowIndex < this._planetSize.x.toNumber(); rowIndex++) {
      line += this.getLineCharacter(new Position(new Integer(rowIndex), new Integer(columnIndex)));
    }
    return line;
  }

  private getLineCharacter(position: Position) {
    if (this.positionHasRover(position)) {
      if (this._roverOrientation === Orientation.North) return "^";
      if (this._roverOrientation === Orientation.South) return "v";
      if (this._roverOrientation === Orientation.East) return ">";
      if (this._roverOrientation === Orientation.West) return "<";
    }
    if (this.positionHasObstacle(position)) return "O";
    if (this.positionIsDiscovered(position)) return "_";
    return ".";
  }

  private positionHasRover(position: Position) {
    return this._roverPosition.equals(position);
  }

  private positionHasObstacle(position: Position) {
    return this._obstaclesPositions.find((obstaclePosition) => {
      return obstaclePosition.equals(position);
    });
  }

  private positionIsDiscovered(position: Position) {
    return this._discoveredPositions.find((discoveredPosition) => {
      return discoveredPosition.equals(position);
    });
  }

  public addObstaclePosition(obstaclePosition: Position) {
    return new PlanetUiConsole(
      this._planetSize,
      [...this._obstaclesPositions, obstaclePosition],
      this._roverPosition,
      this._roverOrientation,
      this._discoveredPositions,
    );
  }
  public newRoverPositionAndOrientation(position: Position, orientation: Orientation) {
    return new PlanetUiConsole(this._planetSize, this._obstaclesPositions, position, orientation, [
      ...this._discoveredPositions,
      this._roverPosition,
    ]);
  }
}
