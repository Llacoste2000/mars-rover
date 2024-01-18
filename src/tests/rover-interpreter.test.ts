import { RoverBuilder } from "../rover/RoverBuilder";
import { RoverInterpreter } from "../roverInterpreter/RoverInterpreter";
import { IRover } from "../rover/Rover.interface";
import { describe, expect, test } from "bun:test";

describe("RoverInterpreter", () => {
  test.each([
    ["?", (rover: IRover) => rover],
    ["!!", (rover: IRover) => rover],
    ["F", (rover: IRover) => rover.forward()],
    ["FF", (rover: IRover) => rover.forward().forward()],
    ["B", (rover: IRover) => rover.backward()],
    ["LLF", (rover: IRover) => rover.turnLeft().turnLeft().forward()],
    ["R", (rover: IRover) => rover.turnRight()],
  ])("Should interpret the command '%s'", (command, action) => {
    const initialRover = new RoverBuilder().build();

    const interpreter = new RoverInterpreter(initialRover);

    const [newRover] = interpreter.interpret(command);

    const roverTets = new RoverBuilder().build();
    const roverExpect = action(roverTets);

    expect(newRover.position).toEqual(roverExpect.position);
  });
});
