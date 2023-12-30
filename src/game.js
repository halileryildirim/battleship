import player from "./player";
import domLoader from "./dom";
import Ship from "./ship";

const domManage = domLoader();

function game() {
  const playerZero = player();
  const playerBoard = playerZero.board;
  const playerZeroBoard = document.querySelectorAll("#player-board");

  const computer = player();
  const computerBoard = computer.board;
  const compBoard = document.querySelectorAll("#computer-board");

  function startGame() {
    playerBoard.placeShip([0, 0], new Ship(6, "carrier", false));
    playerBoard.placeShip([2, 6], new Ship(4, "battleship", true));
    playerBoard.placeShip([4, 0], new Ship(3, "destroyer", false));
    playerBoard.placeShip([6, 8], new Ship(3, "submarine", true));
    playerBoard.placeShip([7, 2], new Ship(2, "cruiser", false));
    domManage.drawPlayerBoard(playerBoard.board);

    computer.placeShipsRandom(); // computer gets its ships randomized
    domManage.drawCompBoard(computerBoard.board);

    playerZero.setTurn(true);
  }

  function gameplay() {
    if (playerZero.turn) {
      for (const cell of compBoard) {
        cell.addEventListener("click", (e) => {
          const x = e.target.classList[0];
          let y = 0;
          // logic for the cells like 0,0 1,1 since they cant have dupe ID's
          if (e.target.classList[1] === undefined) {
            y = x;
          } else {
            y = e.target.classList[1];
          }
          computerBoard.receiveAttack(x, y);
          console.log(computerBoard.board);
          playerZero.setTurn(false);

          // computer attacks randomly after player attacks
          const attack = computer.compAttack();
          console.log(attack);
          playerBoard.receiveAttack(attack[0], attack[1]);
          console.log(playerBoard.board);
          playerZero.setTurn(true);
        });
      }
      // every cell click updates the cell with updateBoard from DOM.js and computer gameBoard receiveAttack
      // if a valid click is confirmed playerZero.turn = false, computer.turn = true
    }
  }

  /*
    ????????????????????????????????????????????????????????????????????????????????????????????????
    THE ACTUAL FUCKING PROBLEM IS HOW AM I GONNA LINK THE SHIP PLACES IN GAMEBOARD WITH DOM
    ????????????????????????????????????????????????????????????????????????????????????????????????
  */
  return { startGame, gameplay, playerZero, computer };
}

export default game;
