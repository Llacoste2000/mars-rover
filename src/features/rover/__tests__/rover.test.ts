import { Orientation } from "../../orientation/Orientation";
import { PlanetInfinite } from "../../planet/PlanetInfinite";
import { PlanetToroidal } from "../../planet/PlanetToroidal";
import { PlanetWithObstacle } from "../../planet/PlanetWithObstacle";
import { Position } from "../../position/Position";
import { RoverBuilder } from "../RoverBuilder";

describe("Rover on a toroidal planet", () => {
  const map = new PlanetToroidal(new Position(5, 5));

  it("should spawn on 0,0", () => {
    const position = new Position(0, 0);
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).build();

    expect(rover.position).toEqual(position);
  })

  it("should move 1 y forward", () => {
    const position = new Position(0, 0);
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).build();

    const newRover = rover.forward();
    expect(newRover.position).toEqual({ ...position, y: position.y + 1 });
  })
  it("should move 1 y backward", () => {
    const position = new Position(0, 0);
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).build();

    const newRover = rover.backward();
    expect(newRover.position).toEqual({ ...position, y: map.size.y - 1 });
  })

  it("should move 1 x forward", () => {
    const position = new Position(0, 0);
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).oriented(Orientation.East).build();

    const newRover = rover.forward();
    expect(newRover.position).toEqual({ ...position, x: position.x + 1 });
  })
  it("should move 1 x backward", () => {
    const position = new Position(0, 0);
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).oriented(Orientation.East).build();

    const newRover = rover.backward();
    expect(newRover.position).toEqual({ ...position, x: map.size.x - 1 });
  })

  it("should turn right", () => {
    const position = new Position(0, 0);
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).oriented(Orientation.North).build();

    const newRover = rover.turnRight();

    expect(newRover.orientation).toEqual(Orientation.East);
  })

  it("should turn left", () => {
    const position = new Position(0, 0);

    const rover = new RoverBuilder().onPlanet(map).withPosition(position).oriented(Orientation.North).build();

    const newRover = rover.turnLeft();

    expect(newRover.orientation).toEqual(Orientation.West);
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
    new Position(0, 1),
  ]

  const planet = new PlanetInfinite();
  const planetWithObstacle = new PlanetWithObstacle(planet, obstacles);

  it('should throw error if rover spawn on obstacle', () => {
    const initialPosition = new Position(0, 1)

    const roverBuilder = new RoverBuilder().onPlanet(planetWithObstacle).withPosition(initialPosition);

    expect(() => roverBuilder.build()).toThrowError();
  })

  it('should not go forward', () => {
    const initialPosition = new Position(0, 0);
    const rover = new RoverBuilder().onPlanet(planetWithObstacle).withPosition(initialPosition).build();

    const newRover = rover.forward();

    expect(newRover.position).toEqual(initialPosition);
  })
  it('should not go backward', () => {
    const initialPosition = new Position(0, 2);
    const rover = new RoverBuilder().onPlanet(planetWithObstacle).withPosition(initialPosition).build();

    const newRover = rover.backward();

    expect(newRover.position).toEqual(initialPosition);
  })
})