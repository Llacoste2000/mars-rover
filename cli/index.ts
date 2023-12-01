import { Planet } from "../src/features/planet/planet";
import { RoverBuilder } from "../src/features/rover/RoverBuilder";

const rover = new RoverBuilder()
  .onPlanet(new Planet({ x: 5, y: 5 }))
  .withPosition({ x: 1, y: 1 })
  .build();

rover.printPosition();

// rover.forward();
// rover.turnRight();
// rover.backward();
// rover.turnRight();
// rover.forward();
// rover.turnRight();
// rover.forward();
rover.backward();
rover.backward();

rover.printPosition();
