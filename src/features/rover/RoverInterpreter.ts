import { IRover } from "./types";

export const roverInterpreterCommands = {
  F: "F",
  B: "B",
  L: "L",
  R: "R"
} as const;

export type RoverInterpreterCommands = typeof roverInterpreterCommands[keyof typeof roverInterpreterCommands];

export class RoverInterpreter {
  constructor(private rover: IRover) { }


  execute(command: RoverInterpreterCommands) {
    switch (command) {
      case roverInterpreterCommands.F:
        this.rover.forward();
        break;
      case roverInterpreterCommands.B:
        this.rover.backward();
        break;
      case roverInterpreterCommands.L:
        this.rover.turnLeft();
        break;
      case roverInterpreterCommands.R:
        this.rover.turnRight();
        break;
      default:
        break;
    }
  }

}