import { Rover } from "./rover/rover"

const rover = new Rover()

console.log(rover.position)

rover.forward()
rover.forward()
rover.forward()
rover.forward()
rover.forward()
rover.forward()
rover.forward()

console.log(rover.position)
