import { Integer } from "./topologie/Integer";
import { Orientation } from "./topologie/Orientation";
import { PlanetToroidal } from "./topologie/PlanetToroidal";
import { PlanetWithObstacle } from "./topologie/PlanetWithObstacle";
import { Position } from "./topologie/Position";

const REPEATER_ENABLED = false;
export const REPEATER_SERVER_PORT = 3001;
export const REPEATER_CONNECTION_URL = "ws://localhost:3000";
export const ROVER_SERVER_PORT = 3000;
export const MISSION_CONTROL_CONNECTION_URL = `ws://localhost:${REPEATER_ENABLED ? REPEATER_SERVER_PORT : ROVER_SERVER_PORT}`;

export const INITIAL_ROVER_POSITION = new Position(new Integer(0), new Integer(0));
export const INITIAL_ROVER_ORIENTATION = Orientation.North;

export const PLANET_OBSTACLES = [
  new Position(new Integer(3), new Integer(3)),
  new Position(new Integer(3), new Integer(4)),
];
export const PLANET_SIZE = new Position(new Integer(5), new Integer(5));
export const PLANET = new PlanetWithObstacle(new PlanetToroidal(PLANET_SIZE), PLANET_OBSTACLES);
