import { WebSocket } from "ws";
import { IRover } from "../rover/Rover.interface";
import { RoverInterpreter } from "../roverInterpreter/RoverInterpreter";

export class RemoteRover {
  constructor(private rover: IRover) {
    const socket = new WebSocket("ws://localhost:3000");

    socket.on("open", () => {
      console.log("connected");
    });

    socket.on("message", (message) => {
      const command = message.toString();

      console.log(`Received: ${command}`);

      const roverInterpreter = new RoverInterpreter(this.rover);

      this.rover = roverInterpreter.interpret(command);

      console.log(this.rover.toString());

      socket.send(this.rover.toString());
    });
  }
}
