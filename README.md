# Battleship

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-563d7c?&style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&labelColor=CB3837&logoColor=CB3837)
![Webpack](https://img.shields.io/badge/Webpack-529ac7?style=for-the-badge&labelColor=8DD6F9&logoColor=226ea9&logo=webpack)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&labelColor=ffffff&logoColor=C21325&logo=jest)
![Figma](https://img.shields.io/badge/Figma-7e65ee?&style=for-the-badge)

This is a web application that was built using the MVC architectural pattern and the Test-Driven Development methodology. It provides an interface for users to play games of Battleship, with support for either one player games against a bot, or two player games where the device is passed between players.

</b>NOTE:</b> This application only officially supports desktop and laptop devices. Official support for mobile devices will come in a future patch.

## Features
- Icon selection for uniquely identifying players
- Drag and drop functionality for placing ships onto the game board
- Randomize game board ship placements
- Clear the game board entirely while placing ships
- Rotate and reposition ships that have already been placed
- Bot player algorithm that uses probability to attack positions that are statistically the most likely to have a ship
- Distinct handling of one player games versus two player games (e.g. bot will pause before attacking to simulate a real player, two player games will swap which game board has hidden ships depending on whose attacking)

## Bot Attacking Algorithm
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

## Author
I'm <a href="https://github.com/BrandonFitzpatricc">Brandon Fitzpatrick</a>, the designer and programmer behind this application. The highlight of creating this application, and my sole motivator for doing so, was designing and implementing the bot attacking algorithm outlined above. It was my first time ever writing an algorithm to simulate the decision making of a real person; I spent hours researching high level Battleship strategies and how they could be translated into code. The end result is an algorithm based entirely off probability and statistics - without a single use of Math.random() throughout. I'm extremely happy with the outcome, and I'm certain it will give even experienced players a good challenge.
