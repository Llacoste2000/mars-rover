import { RoverBuilder } from "@Domain/rover/RoverBuilder";
import { RoverInterpreter } from "@Domain/roverInterpreter/RoverInterpreter";
import { IRover } from "@Domain/rover/Rover.interface";
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
  ])("Should interpret the command '%s' and return the expected rover", (command, action) => {
    const initialRover = new RoverBuilder().build();

    const interpreter = new RoverInterpreter(initialRover);

    const { currentRover } = interpreter.interpret(command);

    const roverTest = new RoverBuilder().build();
    const roverExpect = action(roverTest);

    expect(currentRover.position).toEqual(roverExpect.position);
  });

  test.each([
    ["FF", (rover: IRover) => [rover.forward(), rover.forward().forward()]],
    ["FR", (rover: IRover) => [rover.forward(), rover.forward().turnRight()]],
  ])("should return the correct history", (command, getHistory) => {
    const initialRover = new RoverBuilder().build();

    const interpreter = new RoverInterpreter(initialRover);

    const { roverHistory } = interpreter.interpret(command);

    const roverTest = new RoverBuilder().build();
    const expectedHistory = getHistory(roverTest);

    expectedHistory.forEach((history, i) => {
      expect(history.position).toEqual(roverHistory[i].position);
    });
  });
});
