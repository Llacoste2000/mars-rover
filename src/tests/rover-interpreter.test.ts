import { RoverBuilder } from "@App/rover/RoverBuilder";
import { RoverInterpreter } from "@App/roverInterpreter/RoverInterpreter";
import { IRover } from "@App/rover/Rover.interface";
import { describe, expect, test } from "bun:test";

describe("RoverInterpreter", () => {
  test.each([
    ["?", (rover: IRover) => rover],
    ["!!", (rover: IRover) => rover],
    ["F", (rover: IRover) => rover.forward()],
    ["FF", (rover: IRover) => rover.forward().then((r) => r.forward())],
    ["B", (rover: IRover) => rover.backward()],
    ["LLF", (rover: IRover) => rover.turnLeft().then((r) => r.turnLeft().then((r2) => r2.forward()))],
    ["R", (rover: IRover) => rover.turnRight()],
  ])("Should interpret the command '%s' and return the expected rover", async (command, action) => {
    const initialRover = new RoverBuilder().build();

    const interpreter = new RoverInterpreter(initialRover);

    const { currentRover } = interpreter.interpret(command);

    const roverTest = new RoverBuilder().build();
    const roverExpect = await action(roverTest);

    expect(currentRover.position).toEqual(roverExpect.position);
  });

  test.each([
    ["FF", (rover: IRover) => [rover.forward(), rover.forward().then((r) => r.forward())]],
    ["FR", (rover: IRover) => [rover.forward(), rover.forward().then((r) => r.turnRight())]],
  ])("should return the correct history", async (command, getHistory) => {
    const initialRover = new RoverBuilder().build();

    const interpreter = new RoverInterpreter(initialRover);

    const { roverHistory } = interpreter.interpret(command);

    const roverTest = new RoverBuilder().build();
    const expectedHistory = await Promise.all(getHistory(roverTest));

    expectedHistory.forEach((history, i) => {
      expect(history.position).toEqual(roverHistory[i].position);
    });
  });
});
