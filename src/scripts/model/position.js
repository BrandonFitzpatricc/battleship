// This class provides an easy, more readable way to pass game board coordinates
// into a method with multiple parameters.
class Position {
  #row;
  #column;

  constructor(row, column) {
    this.#row = row;
    this.#column = column;
  }

  get row() {
    return this.#row;
  }

  get column() {
    return this.#column;
  }
}

export { Position };
