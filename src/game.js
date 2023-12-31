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
        if (
          !cell.classList.contains("hit") &&
          !cell.classList.contains("interacted")
        ) {
          cell.addEventListener("click", (e) => {
            console.log(computerBoard.board);
            const x = e.target.dataset.x;
            const y = e.target.dataset.y;

            computerBoard.receiveAttack(x, y);
            domManage.updateBoard(e.target);
            playerZero.setTurn(false);

            // computer attacks randomly after player attacks
            const attack = computer.compAttack();
            playerBoard.receiveAttack(attack[0], attack[1]);
            domManage.updatePlayerBoard(attack[0], attack[1]);
            playerZero.setTurn(true);
          });
        }
      }
    }
  }
  return { startGame, gameplay, playerZero, computer };
}

export default game;
