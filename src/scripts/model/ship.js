class Ship {
  #name;
  #length;
  #orientation;
  #hitCount;

  static #shipLengths = {
    carrier: 5,
    battleship: 4,
    destroyer: 3,
    submarine: 3,
    "patrol-boat": 2,
  };

  constructor(name, orientation) {
    this.#name = name;
    this.#orientation = orientation;
    this.#length = Ship.#shipLengths[name];
    this.#hitCount = 0;
  }

  get name() {
    return this.#name;
  }

  get length() {
    return this.#length;
  }

  get orientation() {
    return this.#orientation;
  }

  set orientation(value) {
    this.#orientation = value;
  }

  hit() {
    this.#hitCount++;
  }

  isSunk() {
    return this.#length === this.#hitCount;
  }
}

export { Ship };
