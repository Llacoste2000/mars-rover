import { HStack, Input } from "@chakra-ui/react";
import { memo } from "react";

type MapSizeInputsProps = {
  width: number;
  height: number;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
};

const MapSizeInputs = ({
  height,
  setHeight,
  setWidth,
  width,
}: MapSizeInputsProps) => {
  return (
    <HStack
      position={"absolute"}
      bottom={4}
      left="50%"
      transform="translateX(-50%)"
    >
      <Input
        w={"100px"}
        type="number"
        placeholder="Width"
        value={width}
        onChange={(e) => setWidth(Number(e.target.value))}
      />
      <Input
        w={"100px"}
        type="number"
        placeholder="Height"
        value={height}
        onChange={(e) => setHeight(Number(e.target.value))}
      />
    </HStack>
  );
};

const MemoizedMapSizeInputs = memo(MapSizeInputs);
export default MemoizedMapSizeInputs;
