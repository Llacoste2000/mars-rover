import { Planet } from "../src/features/planet/planet";
import { Rover } from "../src/features/rover/rover";

const rover = new Rover(1, 1, new Planet({ x: 5, y: 5 }));

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
