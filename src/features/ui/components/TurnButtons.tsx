import { Button, HStack } from "@chakra-ui/react";
import { memo } from "react";

type TurnButtonsProps = {
  turnLeft: () => void;
  turnRight: () => void;
};

const TurnButtons = ({ turnLeft, turnRight }: TurnButtonsProps) => {
  return (
    <HStack position="absolute" top="4" left="75%" transform="translateX(-50%)">
      <Button aria-label="Turn right" onClick={turnRight}>
        TURN RIGHT
      </Button>
      <Button aria-label="Turn left" onClick={turnLeft}>
        TURN LEFT
      </Button>
    </HStack>
  );
};

const MemoizedTurnButtons = memo(TurnButtons);
export default MemoizedTurnButtons;
