import { PlanetToroidal } from "../src/features/planet/PlanetToroidal";
import { RoverBuilder } from "../src/features/rover/RoverBuilder";

const rover = new RoverBuilder()
  .onPlanet(new PlanetToroidal({ x: 5, y: 5 }))
  .withPosition({ x: 0, y: 0 })
  .build();

rover.printPosition();

rover.forward().forward().forward().forward();

rover.printPosition();

rover.turnRight().backward().backward().backward();

rover.printPosition();