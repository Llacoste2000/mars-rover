import React, { useCallback, useEffect, useState } from "react";
import { Rover } from "../../rover/rover.ts";
import { RoverBuilder } from "../../rover/RoverBuilder.ts";
import { PlanetToroidal } from "../../planet/PlanetToroidal.ts";

const useRover = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  roverPositionX?: number,
  roverPositionY?: number,
  planetHeight?: number,
  planetWidth?: number,
) => {
  const [rover, setRover] = useState<Rover | null>(null);
  const [planetSize, setPlanetSize] = useState({
    x: planetWidth ?? 10,
    y: planetHeight ?? 10,
  });

  const scale = 15;
  const roverSize = 15;

  const drawRover = useCallback(
    (ctx: CanvasRenderingContext2D, rover: Rover) => {
      // Clear planet
      ctx.clearRect(0, 0, planetSize.x * scale, planetSize.y * scale);
      ctx.strokeRect(0, 0, planetSize.x * scale, planetSize.y * scale);

      // Draw rover body
      ctx.fillStyle = "blue";
      ctx.fillRect(
        rover.position.x * scale,
        (planetSize.y - rover.position.y) * scale - roverSize,
        roverSize,
        roverSize,
      );

      // Draw direction arrow on rover
      ctx.fillStyle = "red";
      ctx.beginPath();
      switch (rover.orientation.letter) {
        case "N":
          ctx.fillRect(
            rover.position.x * scale + roverSize / 2 - roverSize / 6,
            (planetSize.y - rover.position.y) * scale - roverSize,
            roverSize / 3,
            roverSize / 3,
          );
          break;
        case "E":
          ctx.fillRect(
            rover.position.x * scale + roverSize - roverSize / 3,
            (planetSize.y - rover.position.y) * scale -
            roverSize / 2 -
            roverSize / 6,
            roverSize / 3,
            roverSize / 3,
          );
          break;
        case "S":
          ctx.fillRect(
            rover.position.x * scale + roverSize / 2 - roverSize / 6,
            (planetSize.y - rover.position.y) * scale -
            roverSize / 2 +
            roverSize / 6,
            roverSize / 3,
            roverSize / 3,
          );
          break;
        case "W":
          ctx.fillRect(
            rover.position.x * scale,
            (planetSize.y - rover.position.y) * scale -
            roverSize / 2 -
            roverSize / 6,
            roverSize / 3,
            roverSize / 3,
          );
          break;
      }
      ctx.fill();
    },
    [planetSize.x, planetSize.y, roverSize],
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    canvasRef.current.width = planetSize.x * scale;
    canvasRef.current.height = planetSize.y * scale;

    const map = new PlanetToroidal({
      x: planetSize.x,
      y: planetSize.y,
    });

    const newRover = new RoverBuilder().onPlanet(map).withPosition({ x: roverPositionX ?? 0, y: roverPositionY ?? 0 }).build();

    setRover(newRover);
    drawRover(ctx, newRover);
  }, [
    canvasRef,
    drawRover,
    planetHeight,
    planetSize.x,
    planetSize.y,
    planetWidth,
    roverPositionX,
    roverPositionY,
    scale,
  ]);

  useEffect(() => {
    console.log("useEffect");

    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    if (!rover) return;

    drawRover(ctx, rover);
  }, [planetSize.x, planetSize.y, rover, drawRover, canvasRef]);

  const forward = useCallback(() => {
    if (!rover) return;
    rover.forward();
    drawRover(canvasRef.current!.getContext("2d")!, rover);
  }, [canvasRef, drawRover, rover]);

  const backward = useCallback(() => {
    if (!rover) return;
    rover.backward();
    drawRover(canvasRef.current!.getContext("2d")!, rover);
  }, [canvasRef, drawRover, rover]);

  const turnRight = useCallback(() => {
    if (!rover) return;
    rover.turnRight();
    drawRover(canvasRef.current!.getContext("2d")!, rover);
  }, [canvasRef, drawRover, rover]);

  const turnLeft = useCallback(() => {
    if (!rover) return;
    rover.turnLeft();
    drawRover(canvasRef.current!.getContext("2d")!, rover);
  }, [canvasRef, drawRover, rover]);

  return {
    forward,
    backward,
    turnRight,
    turnLeft,
    setPlanetSize,
    planetSize,
  };
};

export default useRover;
