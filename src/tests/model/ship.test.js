import { Ship } from "../../scripts/model/ship.js";

describe("Test ship object instantiation", () => {
  test("Ship objects are successfully created with the specified name, length, and orientation", () => {
    const ship = new Ship("battleship", "vertical");
    expect(ship.name).toBe("battleship");
    expect(ship.orientation).toBe("vertical");
    expect(ship.length).toBe(4);
  });
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
