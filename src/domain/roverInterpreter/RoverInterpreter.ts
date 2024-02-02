import { IRover } from "@Domain/rover/Rover.interface";

const roverInterpreterCommands = {
  F: "F",
  B: "B",
  L: "L",
  R: "R",
} as const;

type RoverInterpreterCommands = (typeof roverInterpreterCommands)[keyof typeof roverInterpreterCommands];

// Service
export class RoverInterpreter {
  constructor(private readonly _rover: IRover) {}

  private execute(command: RoverInterpreterCommands) {
    if (command === roverInterpreterCommands.F) return this._rover.forward();
    if (command === roverInterpreterCommands.B) return this._rover.backward();
    if (command === roverInterpreterCommands.L) return this._rover.turnLeft();
    if (command === roverInterpreterCommands.R) return this._rover.turnRight();
    return this._rover;
  }

  public interpret(command: string): { roverHistory: IRover[]; currentRover: IRover; error: Error | null } {
    const commands = command.split("") as RoverInterpreterCommands[];

    const newRovers: IRover[] = [];
    let error: Error | null = null;

    try {
      commands.forEach((command) => {
        const previousRover = newRovers[newRovers.length - 1] || this._rover;
        const newRover = new RoverInterpreter(previousRover).execute(command);
        newRovers.push(newRover);
      });
    } catch (e) {
      error = e as Error;
    }

    return { roverHistory: newRovers, currentRover: newRovers[newRovers.length - 1] || this._rover, error };
  }
}
