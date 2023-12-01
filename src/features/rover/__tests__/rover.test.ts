import { EOrientation, Orientation } from "../../orientation/Orientation";
import { PlanetToroidal } from "../../planet/PlanetToroidal";
import { RoverBuilder } from "../RoverBuilder";

const map = new PlanetToroidal({ x: 5, y: 5 });
const rover = new RoverBuilder().onPlanet(map).build();

describe("Rover", () => {
  beforeEach(() => {
    rover.position = { x: 0, y: 0 };
    rover.orientation = new Orientation(EOrientation.N);
  });

  it("turnRight", () => {
    expect(rover.orientation.letter).toBe("N");
    rover.turnRight();
    expect(rover.orientation.letter).toBe("E");
    rover.turnRight();
    expect(rover.orientation.letter).toBe("S");
    rover.turnRight();
    expect(rover.orientation.letter).toBe("W");
    rover.turnRight();
    expect(rover.orientation.letter).toBe("N");
  });

  it("turnLeft", () => {
    expect(rover.orientation.letter).toBe("N");
    rover.turnLeft();
    expect(rover.orientation.letter).toBe("W");
    rover.turnLeft();
    expect(rover.orientation.letter).toBe("S");
    rover.turnLeft();
    expect(rover.orientation.letter).toBe("E");
    rover.turnLeft();
    expect(rover.orientation.letter).toBe("N");
  });

  it("forward", () => {
    expect(rover.position).toEqual({ x: 0, y: 0 });
    rover.forward();
    expect(rover.position).toEqual({ x: 0, y: 1 });
    rover.turnRight();
    rover.forward();
    expect(rover.position).toEqual({ x: 1, y: 1 });
    rover.turnRight();
    rover.forward();
    expect(rover.position).toEqual({ x: 1, y: 0 });
    rover.turnRight();
    rover.forward();
    expect(rover.position).toEqual({ x: 0, y: 0 });
    rover.forward();
    expect(rover.position).toEqual({ x: 4, y: 0 });
  });

  it("backward", () => {
    expect(rover.position).toEqual({ x: 0, y: 0 });
    rover.backward();
    expect(rover.position).toEqual({ x: 0, y: 4 });
    rover.turnRight();
    rover.backward();
    expect(rover.position).toEqual({ x: 4, y: 4 });
    rover.turnRight();
    rover.backward();
    expect(rover.position).toEqual({ x: 4, y: 0 });
    rover.turnRight();
    rover.backward();
    expect(rover.position).toEqual({ x: 0, y: 0 });
  });
});
