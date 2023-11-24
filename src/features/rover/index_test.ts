import { Rover } from "./rover";

const rover = new Rover(1, 1);

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
