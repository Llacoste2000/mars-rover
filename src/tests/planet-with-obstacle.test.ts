import { Position } from "@Core/topologie/Position";
import { PlanetWithObstacle } from "@Core/topologie/PlanetWithObstacle";
import { PlanetToroidal } from "@Core/topologie/PlanetToroidal";
import { Integer } from "@Core/topologie/Integer";

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
