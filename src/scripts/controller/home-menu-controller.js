import { loadHomeMenu } from "../view/home-menu.js";
import { initializeIconSelectMenu } from "./icon-select-menu-controller.js";

const initializeHomeMenu = () => {
  loadHomeMenu();

  document.querySelector(".menu-btns").addEventListener("click", (event) => {
    if (event.target.id === "one-player") {
      initializeIconSelectMenu();
    } else if (event.target.id === "two-player") {
      initializeIconSelectMenu();
    }
  });
};

export { initializeHomeMenu };
