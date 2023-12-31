import { RoverBuilder } from "../RoverBuilder"
import { RoverInterpreter } from "../RoverInterpreter";
import { IRover } from "../Rover.interface";

describe("RoverInterpreter", () => {

  test.each([
    ['?', (rover: IRover) => rover],
    ['!!', (rover: IRover) => rover],
    ['F', (rover: IRover) => rover.forward()],
    ['FF', (rover: IRover) => rover.forward().forward()],
    ['B', (rover: IRover) => rover.backward()],
    ['LLF', (rover: IRover) => rover.turnLeft().turnLeft().forward()],
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