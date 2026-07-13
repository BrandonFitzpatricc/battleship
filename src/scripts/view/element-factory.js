const createElement = (type, className, textContent, ...attributes) => {
  const element = document.createElement(type);
  element.className = className;
  element.textContent = textContent;
  attributes.forEach((attribute) => {
    element.setAttribute(attribute.name, attribute.value);
  });
  return element;
};

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

export { createElement, Attribute };
