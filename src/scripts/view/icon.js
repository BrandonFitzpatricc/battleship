class Icon {
  #src;
  #alt;

  constructor(src, alt) {
    this.#src = src;
    this.#alt = alt;
  }

  get src() {
    return this.#src;
  }

  get alt() {
    return this.#alt;
  }
}

export { Icon };
