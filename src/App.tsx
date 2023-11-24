import { useCallback, useRef } from "react";
import Canvas from "./features/ui/components/Canvas";
import MoveButtons from "./features/ui/components/MoveButtons";
import TurnButtons from "./features/ui/components/TurnButtons";
import useRover from "./features/ui/hooks/useRoverCanvas";
import { Center } from "@chakra-ui/react";
import MapSizeInputs from "./features/ui/components/mapSizeInputs";

function App() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { backward, forward, turnLeft, turnRight, setPlanetSize, planetSize } =
    useRover(ref, 0, 0, 40, 60);

  const handleSetHeight = useCallback(
    (height: number) => {
      setPlanetSize((prev) => ({ ...prev, y: height }));
    },
    [setPlanetSize],
  );

  const handleSetWidth = useCallback(
    (width: number) => {
      setPlanetSize((prev) => ({ ...prev, x: width }));
    },
    [setPlanetSize],
  );

  return (
    <Center h="100vh">
      <Canvas ref={ref} />
      <MoveButtons backward={backward} forward={forward} />
      <TurnButtons turnLeft={turnLeft} turnRight={turnRight} />
      <MapSizeInputs
        width={planetSize.x}
        height={planetSize.y}
        setHeight={handleSetHeight}
        setWidth={handleSetWidth}
      />
    </Center>
  );
}

export default App;
