import Ship from "./ship";
import gameboard from "./gameboard";
import player from "./player";

function domLoader() {
  function drawBoard() {
    // draw board for player
    const playerBoard = document.querySelector("#player-board");
    for (let i = 0; i < 10; i += 1) {
      const playerRow = document.createElement("div");
      for (let j = 0; j < 10; j += 1) {
        const cell = document.createElement("div");
        cell.classList.add(`(${i},${j})`);
        playerRow.append(cell);
      }
      playerBoard.append(playerRow);
    }
    // draw board for computer
    const computerBoard = document.querySelector("#computer-board");
    for (let i = 0; i < 10; i += 1) {
      const computerRow = document.createElement("div");
      for (let j = 0; j < 10; j += 1) {
        const cell = document.createElement("div");
        cell.classList.add(`(${i},${j})`);
        computerRow.append(cell);
      }
      computerBoard.append(computerRow);
    }
  }

  return { drawBoard };
}

export default domLoader;
