import { Position } from "../../position/Position";
import { PlanetWithObstacle } from "../PlanetWithObstacle";
import { PlanetToroidal } from "../PlanetToroidal";

describe('Infinite planet with obstacle', () => {
  const planet = new PlanetToroidal(new Position(5, 5))

  test('obstacle should be on planet', () => {
    const position = new Position(0, 0);
    const planetWithObstacle = new PlanetWithObstacle(planet, [position]);
    expect(planetWithObstacle.isPositionAvailable(position)).toBe(false);
  })

  test('obstacle should not be on planet', () => {
    const obstaclePosition = new Position(0, 0);
    const planetWithObstacle = new PlanetWithObstacle(planet, [obstaclePosition]);

    const position = new Position(0, 1);
    expect(planetWithObstacle.isPositionAvailable(position)).toBe(true);
  })
})