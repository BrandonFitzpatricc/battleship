import { sayHello } from "../scripts";

test("Say hello works", () => {
  expect(sayHello()).toBe("Hello");
});
