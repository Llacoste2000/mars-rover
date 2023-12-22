import { Position } from "../../position/Position";
import { PlanetInfiniteWithObstacle } from "../PlanetInfiniteWithObstacle";

describe('Infinite planet with obstacle', () => {

  test('obstacle should be on planet', () => {
    const position: Position = { x: 0, y: 0 };
    const planet = new PlanetInfiniteWithObstacle([position]);
    expect(planet.isObstacle(position)).toBe(true);
  })

  test('obstacle should not be on planet', () => {
    const obstaclePosition: Position = { x: 0, y: 0 };
    const planet = new PlanetInfiniteWithObstacle([obstaclePosition]);

    const position: Position = { x: 0, y: 1 };
    expect(planet.isObstacle(position)).toBe(false);
  })
})