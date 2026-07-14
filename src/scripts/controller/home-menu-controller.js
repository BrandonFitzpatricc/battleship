import { loadHomeMenu } from "../view/home-menu.js";
import { loadIconSelectMenu } from "../view/icon-select-menu.js";

loadHomeMenu();

document.querySelector("#one-player").addEventListener("click", (event) => {
  if (event.target.id === "one-player") {
    loadIconSelectMenu();
  } else if (event.target.id === "two-player") {
    // toggle two player mode
  }
});
