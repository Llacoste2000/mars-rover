import { Button, HStack } from "@chakra-ui/react";

type TurnButtonsProps = {
  turnLeft: () => void;
  turnRight: () => void;
};

const TurnButtons = ({ turnLeft, turnRight }: TurnButtonsProps) => {
  return (
    <HStack position="absolute" top="4" left="75%" translateX="-50%">
      <Button aria-label="Turn right" onClick={turnRight}>
        TURN RIGHT
      </Button>
      <Button aria-label="Turn left" onClick={turnLeft}>
        TURN LEFT
      </Button>
    </HStack>
  );
};

export default TurnButtons;
