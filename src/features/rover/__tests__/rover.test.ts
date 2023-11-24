import { Rover } from "../rover";

const rover = new Rover(0, 0);

describe("Rover", () => {
  beforeEach(() => {
    rover.position = { x: 0, y: 0 };
    rover.orientation = "N";
  });

  it("turnRight", () => {
    expect(rover.orientation).toBe("N");
    rover.turnRight();
    expect(rover.orientation).toBe("E");
    rover.turnRight();
    expect(rover.orientation).toBe("S");
    rover.turnRight();
    expect(rover.orientation).toBe("W");
    rover.turnRight();
    expect(rover.orientation).toBe("N");
  });

  it("turnLeft", () => {
    expect(rover.orientation).toBe("N");
    rover.turnLeft();
    expect(rover.orientation).toBe("W");
    rover.turnLeft();
    expect(rover.orientation).toBe("S");
    rover.turnLeft();
    expect(rover.orientation).toBe("E");
    rover.turnLeft();
    expect(rover.orientation).toBe("N");
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
