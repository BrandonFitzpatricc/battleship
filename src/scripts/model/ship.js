class Ship {
  #name;
  #length;
  #hitCount;

  static #shipLengths = {
    carrier: 5,
    battleship: 4,
    destroyer: 3,
    submarine: 3,
    "patrol-boat": 2,
  };

  constructor(name) {
    this.#name = name;
    this.#length = Ship.#shipLengths[name];
    this.#hitCount = 0;
  }

  get name() {
    return this.#name;
  }

  get length() {
    return this.#length;
  }

  hit() {
    this.#hitCount++;
  }

  isSunk() {
    return this.#length === this.#hitCount;
  }
}

export { Ship };
