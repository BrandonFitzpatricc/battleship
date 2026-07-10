import { SuccessfulAttack } from "../../scripts/model/successful-attack";
import { Position } from "../../scripts/model/position";

describe("Test successful attack object instantiation", () => {
  test("Successful attack objects are successfully created with the specified row and column values", () => {
    const successfulAttack = new SuccessfulAttack(
      new Position(4, 3),
      "horizontal",
    );
    expect(successfulAttack.position.row).toBe(4);
    expect(successfulAttack.position.column).toBe(3);
    expect(successfulAttack.orientation).toBe("horizontal");
  });
});
