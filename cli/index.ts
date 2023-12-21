import { PlanetToroidal } from "../src/features/planet/PlanetToroidal";
import { RoverBuilder } from "../src/features/rover/RoverBuilder";
import { RoverInterpreter } from "../src/features/rover/RoverInterpreter";

const rover = new RoverBuilder()
  .onPlanet(new PlanetToroidal({ x: 5, y: 5 }))
  .withPosition({ x: 0, y: 0 })
  .build();

const interpreter = new RoverInterpreter(rover);

rover.printPosition();
interpreter.interpret("FFFRFFF");

rover.printPosition();

// rover.forward().forward().forward().forward();

// rover.printPosition();

// rover.turnRight().backward().backward().backward();

// rover.printPosition();