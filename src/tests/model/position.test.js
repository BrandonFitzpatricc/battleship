import { Position } from "../../scripts/model/position";

describe("Test position object instantiation", () => {
  test("Position objects are successfully created with the specified row and column values", () => {
    const position = new Position(4, 3);
    expect(position.row).toBe(4);
    expect(position.column).toBe(3);
    expect(position.getPosition()).toEqual([4, 3]);
  });
});
