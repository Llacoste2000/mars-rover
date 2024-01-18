import { Integer } from "../topologie/Integer";
import { Position } from "../topologie/Position";

export class PlanetUi {
  constructor(
    private readonly planetSize: Position,
    private readonly obstaclesPositions: Position[],
    private readonly roverPosition: Position,
  ) {}

  public display() {
    for (let index = 0; index < this.planetSize.x.toNumber(); index += 1) {
      let line = "";
      for (let index2 = 0; index2 < this.planetSize.y.toNumber(); index2 += 1) {
        const position = new Position(new Integer(index), new Integer(index2));

        if (this.positionHasRover(position)) {
          line += "R";
        } else if (this.positionHasObstacle(position)) {
          line += "O";
        } else {
          line += ".";
        }
      }
      console.log(`${line}\n`);
    }
  }

  private positionHasRover(position: Position) {
    return this.roverPosition.equals(position);
  }

  private positionHasObstacle(position: Position) {
    return this.obstaclesPositions.find((obstaclePosition) => {
      return obstaclePosition.equals(position);
    });
  }

  public updateRoverPosition(roverPosition: Position) {
    return new PlanetUi(this.planetSize, this.obstaclesPositions, roverPosition);
  }

  public addObstaclePosition(obstaclePosition: Position) {
    return new PlanetUi(this.planetSize, [...this.obstaclesPositions, obstaclePosition], this.roverPosition);
  }
}
