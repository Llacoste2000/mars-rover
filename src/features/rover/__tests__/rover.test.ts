import { EOrientation, Orientation } from "../../orientation/Orientation";
import { InfinitePlanet } from "../../planet/PlanetInfinite";
import { PlanetToroidal } from "../../planet/PlanetToroidal";
import { RoverBuilder } from "../RoverBuilder";


describe("Rover on a toroidal planet", () => {
  const map = new PlanetToroidal({ x: 5, y: 5 });
  const rover = new RoverBuilder().onPlanet(map).build();

  beforeEach(() => {
    rover.position = { x: 0, y: 0 };
    rover.orientation = new Orientation(EOrientation.N);
  });

  it("should spawn on 0,0", () => {
    const position = { x: 0, y: 0 };
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).build();

    expect(rover.position).toEqual(position);
  })

  it("should move 1 y forward", () => {
    const position = { x: 0, y: 0 };
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).build();

    rover.forward();
    expect(rover.position).toEqual({ ...position, y: position.y + 1 });
  })
  it("should move 1 y backward", () => {
    const position = { x: 0, y: 0 };
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).build();

    rover.backward();
    expect(rover.position).toEqual({ ...position, y: map.size.y - 1 });
  })

  it("should move 1 x forward", () => {
    const position = { x: 0, y: 0 };
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).oriented(new Orientation(EOrientation.E)).build();

    rover.forward();
    expect(rover.position).toEqual({ ...position, x: position.x + 1 });
  })
  it("should move 1 x backward", () => {
    const position = { x: 0, y: 0 };
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).oriented(new Orientation(EOrientation.E)).build();

    rover.backward();
    expect(rover.position).toEqual({ ...position, x: map.size.x - 1 });
  })

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


describe("Rover on a infinite planet", () => {
  const map = new InfinitePlanet();

  it("go forward", () => {
    const rover = new RoverBuilder().onPlanet(map).build();

    expect(rover.position).toEqual({ x: 0, y: 0 });
    rover.forward().forward().forward().forward();
    expect(rover.position).toEqual({ x: 0, y: 4 });
  })
  it("go backward", () => {
    const rover = new RoverBuilder().onPlanet(map).build();

    expect(rover.position).toEqual({ x: 0, y: 0 });
    rover.backward().backward().backward().backward();
    expect(rover.position).toEqual({ x: 0, y: -4 });
  })
})