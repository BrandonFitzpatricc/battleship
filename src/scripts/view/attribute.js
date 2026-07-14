// This class provides an easy and readable means to assign an attribute to a DOM element
// that's being created.
class Attribute {
  #name;
  #value;

  constructor(name, value) {
    this.#name = name;
    this.#value = value;
  }

  get name() {
    return this.#name;
  }

  get value() {
    return this.#value;
  }
}

export { Attribute };
