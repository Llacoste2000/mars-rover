import { WebSocket } from "ws";
import { RoverBuilder } from "./rover/RoverBuilder";

const rover = new RoverBuilder().build();

console.log(rover.toString());

const socket = new WebSocket("ws://localhost:3000");

socket.on("open", () => {
  console.log("connected");

  socket.emit("message", rover.toString());

  socket.send("Hello");
});

socket.on("error", (error) => {
  console.log(error);
});

socket.on("message", (message) => {
  console.log(`Received: ${message}`);
});
