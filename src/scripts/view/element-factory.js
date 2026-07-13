const createElement = (type, className, ...attributes) => {
  const element = document.createElement(type);
  element.className = className;
  attributes.forEach((attribute) => {
    element.setAttribute(attribute.name, attribute.value);
  });
  return element;
};

const createTextElement = (type, className, textContent, ...attributes) => {
  const element = document.createElement(type);
  element.className = className;
  element.textContent = textContent;
  attributes.forEach((attribute) => {
    element.setAttribute(attribute.name, attribute.value);
  });
  return element;
};

const createIconBtn = (className, id, src, alt, dimensions) => {
  const btn = createElement("button", className, new Attribute("id", id));

  const iconElement = createElement(
    "img",
    "option icon",
    new Attribute("src", src),
    new Attribute("alt", alt),
    new Attribute("width", dimensions),
    new Attribute("height", dimensions),
  );

  btn.appendChild(iconElement);

  return btn;
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

export { createElement, createTextElement, createIconBtn, Attribute };
