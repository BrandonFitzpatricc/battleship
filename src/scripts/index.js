import "../stylesheets/custom-reset.css";
import "../stylesheets/universal.css";
import "../stylesheets/home-menu.css";
import "../stylesheets/icon-select-menu.css";
import "../stylesheets/ship-placement-menu.css";
import "../stylesheets/game-screen.css";
import "../stylesheets/prompt.css";

import { initializeHomeMenu } from "./controller/home-menu-controller.js";

initializeHomeMenu();

// things to do:
// fix bugs involving the play again/back to menu buttons
// check and make sure none of the new stuff you implemented causes any new bugs
// remove the "player one" text from 1 player mode icon select menu
