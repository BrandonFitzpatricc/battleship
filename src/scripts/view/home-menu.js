import { createElement, createTextElement } from "./utilities/element-factory";
import { Attribute } from "./utilities/attribute";

const loadHomeMenu = () => {
  const mainContent = document.querySelector(".main-content");

  mainContent.textContent = "";

  const homeMenu = createElement("div", "home-menu");

  const header = createTextElement("div", "header", "Battleship");
  const menuBtns = loadMenuBtns();

  homeMenu.append(header, menuBtns);

  mainContent.appendChild(homeMenu);
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
