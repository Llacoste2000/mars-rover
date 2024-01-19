import { IRover } from "../rover/Rover.interface";

export const roverInterpreterCommands = {
  F: "F",
  B: "B",
  L: "L",
  R: "R",
} as const;

export type RoverInterpreterCommands = (typeof roverInterpreterCommands)[keyof typeof roverInterpreterCommands];

// Service
export class RoverInterpreter {
  constructor(private readonly rover: IRover) {}

  private execute(command: RoverInterpreterCommands) {
    if (command === roverInterpreterCommands.F) return this.rover.forward();
    if (command === roverInterpreterCommands.B) return this.rover.backward();
    if (command === roverInterpreterCommands.L) return this.rover.turnLeft();
    if (command === roverInterpreterCommands.R) return this.rover.turnRight();
    return this.rover;
  }

  public interpret(command: string): { roverHistory: IRover[]; currentRover: IRover; error: Error | null } {
    const commands = command.split("") as RoverInterpreterCommands[];

    const newRovers: IRover[] = [];
    let error: Error | null = null;

    try {
      commands.forEach((command) => {
        const previousRover = newRovers[newRovers.length - 1] || this.rover;
        const newRover = new RoverInterpreter(previousRover).execute(command);
        newRovers.push(newRover);
      });
    } catch (e) {
      error = e as Error;
    }

    return { roverHistory: newRovers, currentRover: newRovers[newRovers.length - 1] || this.rover, error };
  }
}
