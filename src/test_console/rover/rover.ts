import { Planet } from "../planet/planet.ts";

const orientations = {
  N: "N",
  E: "E",
  S: "S",
  W: "W",
} as const

interface Position {
  x: number;
  y: number;
}

type Orientation = typeof orientations[keyof typeof orientations];
const orientationsArray = Object.values(orientations)

const map = new Planet({ x: 5, y: 5 })

export class Rover {
  orientation: Orientation = orientations.N;
  position: Position = { x: 0, y: 0 };

  turnRight() {
    const currentIndex = orientationsArray.indexOf(this.orientation);
    const nextIndex = (currentIndex + 1) % orientationsArray.length;
    this.orientation = orientationsArray[nextIndex];
  }
  turnLeft() {
    const currentIndex = orientationsArray.indexOf(this.orientation);
    const nextIndex = (currentIndex - 1) % orientationsArray.length;
    this.orientation = orientationsArray[nextIndex];
  }
  forward() {
    switch (this.orientation) {
      case orientations.N:
        this.position.y = (this.position.y + 1) % map.getMaxY();
        break;
      case orientations.E:
        this.position.x = (this.position.x + 1) % map.getMaxX();
        break;
      case orientations.S:
        this.position.y = (this.position.y - 1 + map.getMaxY()) % map.getMaxY();
        break;
      case orientations.W:
        this.position.x = (this.position.x - 1 + map.getMaxX()) % map.getMaxX();
        break;
    }
  }
  backward(
  ) {
    switch (this.orientation) {
      case orientations.N:
        this.position.y = (this.position.y - 1 + map.getMaxY()) % map.getMaxY();
        break;
      case orientations.E:
        this.position.x = (this.position.x - 1 + map.getMaxX()) % map.getMaxX();
        break;
      case orientations.S:
        this.position.y = (this.position.y + 1) % map.getMaxY();
        break;
      case orientations.W:
        this.position.x = (this.position.x + 1) % map.getMaxX();
        break;
    }
  }
}