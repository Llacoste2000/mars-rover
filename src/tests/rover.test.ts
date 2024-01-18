import { Integer } from "../topologie/Integer";
import { Orientation } from "../topologie/Orientation";
import { PlanetInfinite } from "../topologie/PlanetInfinite";
import { PlanetToroidal } from "../topologie/PlanetToroidal";
import { PlanetWithObstacle } from "../topologie/PlanetWithObstacle";
import { Position } from "../topologie/Position";
import { RoverBuilder } from "../rover/RoverBuilder";
import { describe, expect, it } from "bun:test";

describe("Rover on a toroidal planet", () => {
  const map = new PlanetToroidal(new Position(new Integer(5), new Integer(5)));

  it("should spawn on 0,0", () => {
    const position = new Position(Integer.zero, Integer.zero);
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).build();

    expect(rover.position).toEqual(position);
  });

  it("should move 1 y forward", () => {
    const position = new Position(Integer.zero, Integer.zero);
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).build();

    const newRover = rover.forward();
    expect(newRover.position).toEqual(new Position(position.x, position.y.add(Integer.one)));
  });
  it("should move 1 y backward", () => {
    const position = new Position(Integer.zero, Integer.zero);
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).build();

    const newRover = rover.backward();
    expect(newRover.position).toEqual(new Position(position.x, map.size.y.subtract(Integer.one)));
  });

  it("should move 1 x forward", () => {
    const position = new Position(Integer.zero, Integer.zero);
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).oriented(Orientation.East).build();

    const newRover = rover.forward();
    expect(newRover.position).toEqual(new Position(position.x.add(Integer.one), position.y));
  });
  it("should move 1 x backward", () => {
    const position = new Position(Integer.zero, Integer.zero);
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).oriented(Orientation.East).build();

    const newRover = rover.backward();
    expect(newRover.position).toEqual(new Position(map.size.x.subtract(Integer.one), position.y));
  });

  it("should turn right", () => {
    const position = new Position(Integer.zero, Integer.zero);
    const rover = new RoverBuilder().onPlanet(map).withPosition(position).oriented(Orientation.North).build();

    const newRover = rover.turnRight();

    expect(newRover.orientation).toEqual(Orientation.East);
  });

  it("should turn left", () => {
    const position = new Position(Integer.zero, Integer.zero);

    const rover = new RoverBuilder().onPlanet(map).withPosition(position).oriented(Orientation.North).build();

    const newRover = rover.turnLeft();

    expect(newRover.orientation).toEqual(Orientation.West);
  });
});

describe("Rover on a infinite planet", () => {
  const map = new PlanetInfinite();

  it("go forward", () => {
    const rover = new RoverBuilder().onPlanet(map).build();

    expect(rover.position).toEqual(new Position(Integer.zero, Integer.zero));
    const newRover = rover.forward().forward().forward().forward();
    expect(newRover.position).toEqual(new Position(Integer.zero, new Integer(4)));
  });
  it("go backward", () => {
    const rover = new RoverBuilder().onPlanet(map).build();

    expect(rover.position).toEqual(new Position(Integer.zero, Integer.zero));
    const newRover = rover.backward().backward().backward().backward();
    expect(newRover.position).toEqual(new Position(Integer.zero, new Integer(-4)));
  });
});

describe("Rover on a infinite planet with obstacle", () => {
  const obstacles = [new Position(Integer.zero, Integer.one)];

  const planet = new PlanetInfinite();
  const planetWithObstacle = new PlanetWithObstacle(planet, obstacles);

  it("should throw error if rover spawn on obstacle", () => {
    const initialPosition = new Position(Integer.zero, Integer.one);

    const roverBuilder = new RoverBuilder().onPlanet(planetWithObstacle).withPosition(initialPosition);

    expect(() => roverBuilder.build()).toThrow();
  });

  it("should not go forward", () => {
    const initialPosition = new Position(Integer.zero, Integer.zero);
    const rover = new RoverBuilder().onPlanet(planetWithObstacle).withPosition(initialPosition).build();

    expect(() => rover.forward()).toThrow("obstacle");
  });
  it("should not go backward", () => {
    const initialPosition = new Position(Integer.zero, new Integer(2));
    const rover = new RoverBuilder().onPlanet(planetWithObstacle).withPosition(initialPosition).build();

    expect(() => rover.backward()).toThrow("obstacle");
  });
});
