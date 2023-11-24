import React, { useCallback, useEffect, useState } from "react";
import { Rover } from "../../rover/rover.ts";

const useRover = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  roverPositionX?: number,
  roverPositionY?: number,
  planetHeight?: number,
  planetWidth?: number,
) => {
  const [rover, setRover] = useState<Rover | null>(null);
  const planetSize = { x: planetWidth ?? 10, y: planetHeight ?? 10 };

  const scale = 10;

  const drawRover = useCallback(
    (ctx: CanvasRenderingContext2D, rover: Rover) => {
      ctx.clearRect(0, 0, planetSize.x * scale, planetSize.y * scale);
      ctx.strokeRect(0, 0, planetSize.x * scale, planetSize.y * scale);
      ctx.fillStyle = "blue";
      ctx.fillRect(
        rover.position.x * scale,
        (planetSize.y - rover.position.y) * scale - 3 * scale,
        3 * scale,
        3 * scale,
      );
      ctx.fillStyle = "red";
      ctx.beginPath();
      switch (rover.orientation) {
        case "N":
          ctx.moveTo(
            rover.position.x * scale + 1.5 * scale,
            (planetSize.y - rover.position.y) * scale - 3 * scale,
          );
          ctx.lineTo(
            rover.position.x * scale + 2.25 * scale,
            (planetSize.y - rover.position.y) * scale - 2.25 * scale,
          );
          ctx.lineTo(
            rover.position.x * scale + 0.75 * scale,
            (planetSize.y - rover.position.y) * scale - 2.25 * scale,
          );
          break;
        case "E":
          ctx.moveTo(
            rover.position.x * scale + 3 * scale,
            (planetSize.y - rover.position.y) * scale - 1.5 * scale,
          );
          ctx.lineTo(
            rover.position.x * scale + 2.25 * scale,
            (planetSize.y - rover.position.y) * scale - 2.25 * scale,
          );
          ctx.lineTo(
            rover.position.x * scale + 2.25 * scale,
            (planetSize.y - rover.position.y) * scale - 0.75 * scale,
          );
          break;
        case "S":
          ctx.moveTo(
            rover.position.x * scale + 1.5 * scale,
            (planetSize.y - rover.position.y) * scale,
          );
          ctx.lineTo(
            rover.position.x * scale + 2.25 * scale,
            (planetSize.y - rover.position.y) * scale - 0.75 * scale,
          );
          ctx.lineTo(
            rover.position.x * scale + 0.75 * scale,
            (planetSize.y - rover.position.y) * scale - 0.75 * scale,
          );
          break;
        case "W":
          ctx.moveTo(
            rover.position.x * scale,
            (planetSize.y - rover.position.y) * scale - 1.5 * scale,
          );
          ctx.lineTo(
            rover.position.x * scale + 0.75 * scale,
            (planetSize.y - rover.position.y) * scale - 2.25 * scale,
          );
          ctx.lineTo(
            rover.position.x * scale + 0.75 * scale,
            (planetSize.y - rover.position.y) * scale - 0.75 * scale,
          );
          break;
      }
      ctx.fill();
    },
    [planetSize.x, planetSize.y, scale],
  );
  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // On multiplie la taille du canvas par scale
    canvasRef.current.width = planetSize.x * scale;
    canvasRef.current.height = planetSize.y * scale;

    const newRover = new Rover(roverPositionX ?? 0, roverPositionY ?? 0);
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

  const forward = () => {
    if (!rover) return;
    rover.forward();
    drawRover(canvasRef.current!.getContext("2d")!, rover);
  };

  const backward = () => {
    if (!rover) return;
    rover.backward();
    drawRover(canvasRef.current!.getContext("2d")!, rover);
  };

  const turnRight = () => {
    if (!rover) return;
    rover.turnRight();
    drawRover(canvasRef.current!.getContext("2d")!, rover);
  };

  const turnLeft = () => {
    if (!rover) return;
    rover.turnLeft();
    drawRover(canvasRef.current!.getContext("2d")!, rover);
  };

  return {
    forward,
    backward,
    turnRight,
    turnLeft,
  };
};

export default useRover;
