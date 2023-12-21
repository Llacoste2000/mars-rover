import { Rover } from "./rover.ts";

export class SuperRover {
  private rover: Rover;
  private obstacleDetected: boolean = false;

  constructor(rover: Rover) {
    this.rover = rover;
  }

  detectObstacle(): boolean {
    // TODO : implement
    return false;
  }

  forward() {
    if (this.obstacleDetected) {
      return this;
    }
    this.rover.forward();
    this.obstacleDetected = this.detectObstacle();
    return this;
  }

  backward() {
    if (this.obstacleDetected) {
      return this;
    }
    this.rover.backward();
    this.obstacleDetected = this.detectObstacle();
    return this;
  }

  turnRight() {
    if (this.obstacleDetected) {
      return this;
    }
    this.rover.turnRight();
    return this;
  }

  turnLeft() {
    if (this.obstacleDetected) {
      return this;
    }
    this.rover.turnLeft();
    return this;
  }

  printPosition() {
    if (this.obstacleDetected) {
      console.log(`Obstacle detected!`);
      this.rover.printPosition();
    } else {
      this.rover.printPosition();
    }
  }

  resetObstacleDetection() {
    this.obstacleDetected = false;
  }
}
