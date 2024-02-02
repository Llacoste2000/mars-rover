import { Integer } from "@Domain/topologie/Integer";
import { Orientation } from "@Domain/topologie/Orientation";
import { Position } from "@Domain/topologie/Position";
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
    for (let columnIndex = this.planetSize.y.toNumber() - 1; columnIndex >= 0; columnIndex--) {
      console.log(this.generateLine(columnIndex));
    }
    console.log("========================");
  }

  private generateLine(columnIndex: number) {
    let line = "";
    for (let rowIndex = 0; rowIndex < this.planetSize.x.toNumber(); rowIndex++) {
      line += this.getLineCharacter(new Position(new Integer(rowIndex), new Integer(columnIndex)));
    }
    return line;
  }

  private getLineCharacter(position: Position) {
    if (this.positionHasRover(position)) {
      if (this.roverOrientation === Orientation.North) return "^";
      if (this.roverOrientation === Orientation.South) return "v";
      if (this.roverOrientation === Orientation.East) return ">";
      if (this.roverOrientation === Orientation.West) return "<";
    }
    if (this.positionHasObstacle(position)) return "O";
    if (this.positionIsDiscovered(position)) return "_";
    return ".";
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
