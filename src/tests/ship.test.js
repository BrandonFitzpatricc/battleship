import { Ship } from "../scripts/model/ship.js";

test("A ship of length 4 that has been hit 4 times is sunk", () => {
  const ship = new Ship(4);
  for (let i = 0; i < 4; i++) {
    ship.hit();
  }
  expect(ship.isSunk()).toBe(true);
});

test("A ship of length 5 that has been hit 4 times is not sunk", () => {
  const ship = new Ship(5);
  for (let i = 0; i < 4; i++) {
    ship.hit();
  }
  expect(ship.isSunk()).toBe(false);
});
