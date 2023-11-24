import { Button, HStack } from "@chakra-ui/react";

type MoveButtonsProps = {
  forward: () => void;
  backward: () => void;
};

const MoveButtons = ({ backward, forward }: MoveButtonsProps) => {
  return (
    <HStack position="absolute" top="4" left="25%" transform="translateX(-50%)">
      <Button aria-label="Move up" onClick={forward}>
        FORWARD
      </Button>
      <Button aria-label="Move down" onClick={backward}>
        BACKWARD
      </Button>
    </HStack>
  );
};

export default MoveButtons;
