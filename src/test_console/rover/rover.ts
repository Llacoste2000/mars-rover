import { EOrientation, IRover, Orientation, Position, orientations } from "./types.js";
import { Planet } from "../../features/planet/planet.ts";

const map = new Planet({ x: 5, y: 5 })

export class Rover implements IRover {
  orientation: Orientation = EOrientation.N;
  position: Position = { x: 0, y: 0 };

  turnRight() {
    const currentIndex = orientations.indexOf(this.orientation);
    const nextIndex = (currentIndex + 1) % orientations.length;
    this.orientation = orientations[nextIndex];
  }
  turnLeft() {
    const currentIndex = orientations.indexOf(this.orientation);
    const nextIndex = (currentIndex - 1) % orientations.length;
    this.orientation = orientations[nextIndex];
  }
  forward() {
    switch (this.orientation) {
      case EOrientation.N:
        this.position.y = (this.position.y + 1) % map.getMaxY();
        break;
      case EOrientation.E:
        this.position.x = (this.position.x + 1) % map.getMaxX();
        break;
      case EOrientation.S:
        this.position.y = (this.position.y - 1 + map.getMaxY()) % map.getMaxY();
        break;
      case EOrientation.W:
        this.position.x = (this.position.x - 1 + map.getMaxX()) % map.getMaxX();
        break;
    }
  }
  backward(
  ) {
    switch (this.orientation) {
      case EOrientation.N:
        this.position.y = (this.position.y - 1 + map.getMaxY()) % map.getMaxY();
        break;
      case EOrientation.E:
        this.position.x = (this.position.x - 1 + map.getMaxX()) % map.getMaxX();
        break;
      case EOrientation.S:
        this.position.y = (this.position.y + 1) % map.getMaxY();
        break;
      case EOrientation.W:
        this.position.x = (this.position.x + 1) % map.getMaxX();
        break;
    }
  }
}