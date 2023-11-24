import { Button, HStack } from "@chakra-ui/react";

const MoveButtons = () => {
  return (
    <HStack position="absolute" top="4" left="75%" translateX="-50%">
      <Button
        aria-label="Turn right"
        onClick={() => {
          // TODO turn right
          console.log("turn right");
        }}
      >
        TURN RIGHT
      </Button>
      <Button
        aria-label="Turn left"
        onClick={() => {
          // TODO turn left
          console.log("turn left");
        }}
      >
        TURN LEFT
      </Button>
    </HStack>
  );
};

export default MoveButtons;
