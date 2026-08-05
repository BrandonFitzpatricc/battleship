# Battleship

This is a website that was created using HTML, CSS and JavaScript. It provides an interface for users to play games of Battleship, with support for either one player games against a bot, or two player games where the device is passed between players.

Users are initially presented with a menu prompting them to select the number of players. Next, they will be prompted to select an icon to represent themselves within the game, then will be prompted to place their ships. Each of these two prompts will occur twice if there are two players - otherwise the icon and game board of the bot player will be decided randomly.

Ships are placed through a drag and drop menu with various placement options. Users can drag a ship onto any open position within the game board, pick up a placed ship and move it elsewhere, clear the board of all placed ships, and randomize the placement of all ships. The placed ship that was most recently interacted with will be marked as selected, and users will have the option to rotate this ship. Once every ship has been placed, the user will be able to start the game.

The game screen contains two main displays - one for each player. These displays contain the player's icon and the current status of their ships, placed directly above their game board. The player whose currently attacking is marked by header text at the top of the screen, in addition to their icon being highlighted. The game board that's not currently being targeted will be grayed out. In one player mode, the user's ships will always be visible, whereas the bot's ships will never be visible before/during the game. In two player mode, ship visibility will dynamically change depending on who is attacking and who is being attacked. Once the game ends, all ships on each game board become visible. The winner is marked by header text and a crown icon over their player icon.

After a three second countdown to start, players can start attacking each other's game boards. The player that's currently attacking will continue to attack until they miss a ship, then the next player will start to attack, and the cycle will repeat until all of the ships on either game board have been sunk. Positions with missed attacks, damaged ships, or sunk ships are all uniquely marked.

In one player mode, the bot player uses a probability based algorithm to attack the position which is most likely to contain a ship. No randomization is used within any of its decision making. The algorithm works as follows:

- In the case where the bot is looking for a ship:
  - A probability map is created - a two-dimensional array with the same dimensions as the game board, initially containing the value 0 in every position.

  - For every ship that has yet to be sunk, the bot will go through every position within the game board being attacked, and see if it is possible for the ship to be placed horizontally in that position. If yes, then each position corresponding to that placement within the probability map will be incremented by 1. The bot will then check if the ship can be placed vertically in that position and repeat the process.

  - The bot will take the completed probability map, find the highest value within it, and attack the game board at the position in which it was found.

- In the case where a ship has been found and hit once:
  - The same probability map is created, but the bot will only check the probabilities of the positions adjacent to the position where the ship has been hit, and attack the one with the highest probability. It will repeat this until a second hit has been made.

- In the case where a ship has been found and hit more than once:
  - The bot will lock its targeting orientation to either horizontal or vertical, depending on where the previous successful attack was made.

  - A different probability map is created, containing only the probabilities for the current targeting orientation.

  - Two probabilities will be checked: the probabilities of the nearest vacant (or missed attack) positions on each side of the previous successful attack. The bot will attack at whichever of these two positions has the highest probability.

- In the case where a new ship is hit while targeting a different ship:
  - Throughout the targeting process, every ship that has been hit is pushed into a queue. The bot will target the ship at the front of the queue until it is destroyed, then dequeue it and target the next ship in the queue (if there is one).

In two player mode, each time the attacking player switches, the user will be prompted to pass the device to the other player before continuing. While this prompt is up, the ships on each game board are hidden. The prompt can be dismissed with a continue button once the device has been passed to the second player.

Once a game ends, users have the options to play again - bringing them straight back to the ship placement screen, return to the starting menu, or view the final state of each game board from the recently finished game.

This project demonstrates strong foundations in front-end web development, in addition to the following principles of programming:

- The separation of application and user-interface components, the two of which are bridged together by controller components through the use of the Model-View-Controller architectural pattern.

- The ability to design and implement a complex, dynamic algorithm step-by-step.

- Extensive utilization of the Jest testing framework through the adherence of Test-Driven development throughout the development cycle of application components.

- Utilization of various dependencies to enhance developer workflow and productivity, including ESLint to enforce proper coding practices, Prettier to eliminate the need for manual formatting, and Webpack to bundle every program component together into a single file for deployment.
