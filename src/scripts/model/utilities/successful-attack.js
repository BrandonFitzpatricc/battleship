// This class is used by computer players to help determine subsequent attacks
// after hitting a ship.
class SuccessfulAttack {
  #position;
  #orientation;

  constructor(position, orientation) {
    this.#position = position;
    this.#orientation = orientation;
  }

  get position() {
    return this.#position;
  }

  get orientation() {
    return this.#orientation;
  }
}

export { SuccessfulAttack };
