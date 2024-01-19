const REPEATER_ENABLED = false;
export const REPEATER_SERVER_PORT = 3001;
export const REPEATER_CONNECTION_URL = "ws://localhost:3000";
export const ROVER_SERVER_PORT = 3000;
export const MISSION_CONTROL_CONNECTION_URL = `ws://localhost:${REPEATER_ENABLED ? REPEATER_SERVER_PORT : ROVER_SERVER_PORT}`;
