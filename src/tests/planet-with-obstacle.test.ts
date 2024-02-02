import { Position } from "@Domaintopologie/Position";
import { PlanetWithObstacle } from "@Domaintopologie/PlanetWithObstacle";
import { PlanetToroidal } from "@Domaintopologie/PlanetToroidal";
import { Integer } from "@Domaintopologie/Integer";
import { describe, expect, test } from "bun:test";

describe("Infinite planet with obstacle", () => {
  const planet = new PlanetToroidal(new Position(new Integer(5), new Integer(5)));

  test("obstacle should be on planet", () => {
    const position = new Position(Integer.zero, Integer.zero);
    const planetWithObstacle = new PlanetWithObstacle(planet, [position]);
    expect(planetWithObstacle.isPositionAvailable(position)).toBe(false);
  });

  test("obstacle should not be on planet", () => {
    const obstaclePosition = new Position(Integer.zero, Integer.zero);
    const planetWithObstacle = new PlanetWithObstacle(planet, [obstaclePosition]);

    const position = new Position(Integer.zero, Integer.one);
    expect(planetWithObstacle.isPositionAvailable(position)).toBe(true);
  });
});
