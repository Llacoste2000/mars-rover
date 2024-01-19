import { Integer } from "../topologie/Integer";
import { Orientation } from "../topologie/Orientation";
import { Position } from "../topologie/Position";
import { IPlanetUi } from "./PlanetUi.interface";

export class PlanetUiConsole implements IPlanetUi {
  constructor(
    private readonly planetSize: Position,
    private readonly obstaclesPositions: Position[],
    private readonly roverPosition: Position,
    private readonly roverOrientation: Orientation,
    private readonly discoveredPositions: Position[],
  ) {}

  public display() {
    console.log("========================");
    for (let columnIndex = this.planetSize.y.toNumber() - 1; columnIndex >= 0; columnIndex -= 1) {
      let line = "";
      for (let rowIndex = 0; rowIndex < this.planetSize.x.toNumber(); rowIndex += 1) {
        const position = new Position(new Integer(rowIndex), new Integer(columnIndex));

        if (this.positionHasRover(position)) {
          if (this.roverOrientation === Orientation.North) {
            line += "^";
          } else if (this.roverOrientation === Orientation.South) {
            line += "v";
          } else if (this.roverOrientation === Orientation.East) {
            line += ">";
          } else {
            line += "<";
          }
        } else if (this.positionHasObstacle(position)) {
          line += "O";
        } else if (this.positionIsDiscovered(position)) {
          line += "_";
        } else {
          line += ".";
        }
      }
      console.log(`${line}\n`);
    }
    console.log("========================");
  }

  private positionHasRover(position: Position) {
    return this.roverPosition.equals(position);
  }

  private positionHasObstacle(position: Position) {
    return this.obstaclesPositions.find((obstaclePosition) => {
      return obstaclePosition.equals(position);
    });
  }

  private positionIsDiscovered(position: Position) {
    return this.discoveredPositions.find((discoveredPosition) => {
      return discoveredPosition.equals(position);
    });
  }

  public addObstaclePosition(obstaclePosition: Position) {
    return new PlanetUiConsole(
      this.planetSize,
      [...this.obstaclesPositions, obstaclePosition],
      this.roverPosition,
      this.roverOrientation,
      this.discoveredPositions,
    );
  }
  public newRoverPositionAndOrientation(position: Position, orientation: Orientation) {
    return new PlanetUiConsole(this.planetSize, this.obstaclesPositions, position, orientation, [
      ...this.discoveredPositions,
      this.roverPosition,
    ]);
  }
}
