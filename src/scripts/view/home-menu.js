import { createElement, Attribute } from "./element-factory";

const loadHomeMenu = () => {
  const mainContainer = createElement("div", "home-menu");

  const header = createElement("div", "header", "Battleship");
  // prettier-ignore
  const menuBtns = createElement("ul", "menu-btns", "", new Attribute("role", "list"));

  for (let i = 1; i <= 2; i++) {
    const number = i == 1 ? "one" : "two";
    const listItem = createElement("li", "");
    const btn = createElement(
      "div",
      "text-btn",
      `${i} Player`,
      new Attribute("id", `${number}-player`),
    );
    listItem.appendChild(btn);
    menuBtns.appendChild(listItem);
  }

  mainContainer.append(header, menuBtns);

  document.body.append(mainContainer);
};

export { loadHomeMenu };
