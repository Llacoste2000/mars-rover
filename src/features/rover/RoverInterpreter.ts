import { IRover } from "./Rover.interface";

export const roverInterpreterCommands = {
  F: "F",
  B: "B",
  L: "L",
  R: "R"
} as const;

export type RoverInterpreterCommands = typeof roverInterpreterCommands[keyof typeof roverInterpreterCommands];

// Service
export class RoverInterpreter {
  constructor(private rover: IRover) { }

  private execute(command: RoverInterpreterCommands) {
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

  public interpret(command: string) {
    command.split("").forEach(c => this.execute(c as RoverInterpreterCommands));
  }

}