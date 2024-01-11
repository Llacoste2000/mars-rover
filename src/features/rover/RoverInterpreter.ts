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
        return this.rover.forward();
      case roverInterpreterCommands.B:
        return this.rover.backward();
      case roverInterpreterCommands.L:
        return this.rover.turnLeft();
      case roverInterpreterCommands.R:
        return this.rover.turnRight();
      default:
        return this.rover;
    }
  }

  public interpret(command: string): IRover {
    const commands = command.split("");

    commands.forEach(command => {
      const newRover = new RoverInterpreter(this.rover).execute(command as RoverInterpreterCommands);

      this.rover = newRover;
    });

    return this.rover;
  }
}