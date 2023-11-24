import { Button, HStack } from "@chakra-ui/react";

const MoveButtons = () => {
  return (
    <HStack position="absolute" top="4" left="25%" translateX="-50%">
      <Button
        aria-label="Move up"
        onClick={() => {
          // TODO move up
          console.log("move up");
        }}
      >
        UP
      </Button>
      <Button
        aria-label="Move down"
        onClick={() => {
          // TODO move down
          console.log("move down");
        }}
      >
        DOWN
      </Button>
    </HStack>
  );
};

export default MoveButtons;
