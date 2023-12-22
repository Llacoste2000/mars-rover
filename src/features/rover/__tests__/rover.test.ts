import { EOrientation, Orientation } from "../../orientation/Orientation";
import { PlanetInfinite } from "../../planet/PlanetInfinite";
import { PlanetInfiniteWithObstacle } from "../../planet/PlanetInfiniteWithObstacle";
import { PlanetToroidal } from "../../planet/PlanetToroidal";
import { RoverBuilder } from "../RoverBuilder";

describe("Rover on a toroidal planet", () => {
  const map = new PlanetToroidal({ x: 5, y: 5 });

  it("should spawn on 0,0", () => {
    const position = { x: 0, y: 0 };
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).build();

    expect(rover.position).toEqual(position);
  })

  it("should move 1 y forward", () => {
    const position = { x: 0, y: 0 };
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).build();

    const newRover = rover.forward();
    expect(newRover.position).toEqual({ ...position, y: position.y + 1 });
  })
  it("should move 1 y backward", () => {
    const position = { x: 0, y: 0 };
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).build();

    const newRover = rover.backward();
    expect(newRover.position).toEqual({ ...position, y: map.size.y - 1 });
  })

  it("should move 1 x forward", () => {
    const position = { x: 0, y: 0 };
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).oriented(new Orientation(EOrientation.E)).build();

    const newRover = rover.forward();
    expect(newRover.position).toEqual({ ...position, x: position.x + 1 });
  })
  it("should move 1 x backward", () => {
    const position = { x: 0, y: 0 };
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).oriented(new Orientation(EOrientation.E)).build();

    const newRover = rover.backward();
    expect(newRover.position).toEqual({ ...position, x: map.size.x - 1 });
  })

  it("should turn right", () => {
    const position = { x: 0, y: 0 };
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).oriented(new Orientation(EOrientation.N)).build();

    const newRover = rover.turnRight();

    expect(newRover.orientation.letter).toEqual(EOrientation.E);
  })

  it("should turn left", () => {
    const position = { x: 0, y: 0 };
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).oriented(new Orientation(EOrientation.N)).build();

    const newRover = rover.turnLeft();

    expect(newRover.orientation.letter).toEqual(EOrientation.W);
  })
});

describe("Rover on a infinite planet", () => {
  const map = new PlanetInfinite();

  it("go forward", () => {
    const rover = new RoverBuilder().onPlanet(map).build();

    expect(rover.position).toEqual({ x: 0, y: 0 });
    const newRover = rover.forward().forward().forward().forward();
    expect(newRover.position).toEqual({ x: 0, y: 4 });
  })
  it("go backward", () => {
    const rover = new RoverBuilder().onPlanet(map).build();

    expect(rover.position).toEqual({ x: 0, y: 0 });
    const newRover = rover.backward().backward().backward().backward();
    expect(newRover.position).toEqual({ x: 0, y: -4 });
  })
})

describe('Rover on a infinite planet with obstacle', () => {
  const obstacles = [
    { x: 0, y: 1 },
  ]

  const planet = new PlanetInfiniteWithObstacle(obstacles);

  it('should throw error if rover spawn on obstacle', () => {
    const initialPosition = { x: 0, y: 1 };

    const roverBuilder = new RoverBuilder().onPlanet(planet).withPosition(initialPosition);

    expect(() => roverBuilder.build()).toThrowError();
  })

  it('should not go forward', () => {
    const initialPosition = { x: 0, y: 0 };
    const rover = new RoverBuilder().onPlanet(planet).withPosition(initialPosition).build();

    const newRover = rover.forward();

    expect(newRover.position).toEqual(initialPosition);
  })
  it('should not go backward', () => {
    const initialPosition = { x: 0, y: 2 };
    const rover = new RoverBuilder().onPlanet(planet).withPosition(initialPosition).build();

    const newRover = rover.backward();

    expect(newRover.position).toEqual(initialPosition);
  })
})