import { Position } from "./types";
import { Orientation } from "../orientation/Orientation.ts";
import { IPlanet } from "../planet/Planet.interface.ts";
import { Rover } from "./rover.ts";

export class SuperRover extends Rover {
  private obstacleDetected: boolean = false;

  constructor(position: Position, orientation: Orientation, planet: IPlanet) {
    super(position, orientation, planet);
  }

  detectObstacle(): boolean {
    // TODO : implement
    return false;
  }

  forward() {
    if (this.obstacleDetected) {
      return this;
    }
    super.forward();
    this.obstacleDetected = this.detectObstacle();
    return this;
  }

  backward() {
    if (this.obstacleDetected) {
      return this;
    }
    super.backward();
    this.obstacleDetected = this.detectObstacle();
    return this;
  }

  turnRight() {
    if (this.obstacleDetected) {
      return this;
    }
    super.turnRight();
    return this;
  }

  turnLeft() {
    if (this.obstacleDetected) {
      return this;
    }
    super.turnLeft();
    return this;
  }

  printPosition() {
    if (this.obstacleDetected) {
      console.log(`Obstacle detected!`);
      super.printPosition();
    } else {
      super.printPosition();
    }
  }

  resetObstacleDetection() {
    this.obstacleDetected = false;
  }
}
