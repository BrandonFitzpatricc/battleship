import { createElement, createTextElement, Attribute } from "./element-factory";

const loadHomeMenu = () => {
  document.body.textContent = "";

  const mainContainer = createElement("div", "home-menu");

  const header = createTextElement("div", "header", "Battleship");
  const menuBtns = loadMenuBtns();

  mainContainer.append(header, menuBtns);

  document.body.appendChild(mainContainer);
};

function loadMenuBtns() {
  // prettier-ignore
  const menuBtns = createElement("ul", "menu-btns", new Attribute("role", "list"));

  for (let i = 1; i <= 2; i++) {
    const number = i == 1 ? "one" : "two";

    const listItem = createElement("li", "");

    const btn = createTextElement(
      "button",
      "text-btn",
      `${i} Player`,
      new Attribute("id", `${number}-player`),
    );

    listItem.appendChild(btn);

    menuBtns.appendChild(listItem);
  }

  return menuBtns;
}

export { loadHomeMenu };
