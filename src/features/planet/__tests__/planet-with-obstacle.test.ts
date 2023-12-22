import { Position } from "../../position/Position";
import { PlanetWithObstacle } from "../PlanetWithObstacle";
import { PlanetToroidal } from "../PlanetToroidal";

describe('Infinite planet with obstacle', () => {
  const planet = new PlanetToroidal({ x: 5, y: 5 })

  test('obstacle should be on planet', () => {
    const position: Position = { x: 0, y: 0 };
    const planetWithObstacle = new PlanetWithObstacle(planet, [position]);
    expect(planetWithObstacle.isPositionAvailable(position)).toBe(false);
  })

  test('obstacle should not be on planet', () => {
    const obstaclePosition: Position = { x: 0, y: 0 };
    const planetWithObstacle = new PlanetWithObstacle(planet, [obstaclePosition]);

    const position: Position = { x: 0, y: 1 };
    expect(planetWithObstacle.isPositionAvailable(position)).toBe(true);
  })
})