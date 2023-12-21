import { RoverBuilder } from "../RoverBuilder"
import { RoverInterpreter } from "../RoverInterpreter";
import { IRover } from "../types";

describe("RoverInterpreter", () => {

  test.each([
    ['?', (rover: IRover) => rover],
    ['FF', (rover: IRover) => rover.forward().forward()],
    ['B', (rover: IRover) => rover.backward()],
    ['L', (rover: IRover) => rover.turnLeft()],
    ['R', (rover: IRover) => rover.turnRight()],
  ])("Should interpret the command '%s'", (command, action) => {
    const rover = new RoverBuilder().build();

    const interpreter = new RoverInterpreter(rover);

    interpreter.interpret(command);

    const roverExpect = new RoverBuilder().build();
    action(roverExpect);

    expect(rover.position).toEqual(roverExpect.position)
  })

})