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
    const initialRover = new RoverBuilder().build();

    const interpreter = new RoverInterpreter(initialRover);

    const newRover = interpreter.interpret(command);

    const roverTets = new RoverBuilder().build();
    const roverExpect = action(roverTets);

    expect(newRover.position).toEqual(roverExpect.position)
  })
  it("go forward", () => {
    const rover = new RoverBuilder().build();
    const interpreter : RoverInterpreter = new RoverInterpreter(rover);

    interpreter.interpret("F");

    const roverExpect = new RoverBuilder().build();
    roverExpect.forward();
    expect(rover.position).toEqual(roverExpect.position);
  })
  it("go backward", () => {
    const rover = new RoverBuilder().build();
    const interpreter : RoverInterpreter = new RoverInterpreter(rover);

    interpreter.interpret("B");

    const roverExpect = new RoverBuilder().build();
    roverExpect.backward();
    expect(rover.position).toEqual(roverExpect.position);
  })
  it("go left", () => {
    const rover = new RoverBuilder().build();
    const interpreter : RoverInterpreter = new RoverInterpreter(rover);

    interpreter.interpret("L");

    const roverExpect = new RoverBuilder().build();
    roverExpect.turnLeft();
    expect(rover.position).toEqual(roverExpect.position);
  })
  it("go right", () => {
    const rover = new RoverBuilder().build();
    const interpreter : RoverInterpreter = new RoverInterpreter(rover);

    interpreter.interpret("R");

    const roverExpect = new RoverBuilder().build();
    roverExpect.turnRight();
    expect(rover.position).toEqual(roverExpect.position);
  })

})