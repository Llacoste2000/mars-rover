import { useRef } from "react";
import Canvas from "./features/ui/components/Canvas";
import MoveButtons from "./features/ui/components/MoveButtons";
import TurnButtons from "./features/ui/components/TurnButtons";
import useRover from "./features/ui/hooks/useRoverCanvas";
import { Center } from "@chakra-ui/react";

function App() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { backward, forward, turnLeft, turnRight } = useRover(
    ref,
    0,
    0,
    40,
    60,
  );

  return (
    <Center h="100vh">
      <Canvas ref={ref} />
      <MoveButtons backward={backward} forward={forward} />
      <TurnButtons turnLeft={turnLeft} turnRight={turnRight} />
    </Center>
  );
}

export default App;
