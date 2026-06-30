import { Ship } from "../scripts/model/ship.js";

test("Ship objects are successfully created with the specified name", () => {
  const ship = new Ship("battleship");
  expect(ship.name).toBe("battleship");
});

describe("Test hit and isSunk methods", () => {
  test("A battleship (length 4) that has been hit 4 times is sunk", () => {
    const ship = new Ship("battleship");
    for (let i = 0; i < 4; i++) {
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });

  test("A carrier (length 5) that has been hit 4 times is not sunk", () => {
    const ship = new Ship("carrier");
    for (let i = 0; i < 4; i++) {
      ship.hit();
    }
    expect(ship.isSunk()).toBe(false);
  });
});
