import player from "./player";
import domLoader from "./dom";

const domManage = domLoader();

function game() {
  const playerZero = player();
  const playerBoard = playerZero.board;
  const playerZeroBoard = document.querySelectorAll("#player-board");

  const computer = player();
  const computerBoard = computer.board;
  const compBoard = document.querySelectorAll("#computer-board");

  function startGame() {
    // playerBoard.placeShip([0, 0], new Ship(6, "carrier", false));
    // playerBoard.placeShip([2, 6], new Ship(4, "battleship", true));
    // playerBoard.placeShip([4, 0], new Ship(3, "destroyer", false));
    // playerBoard.placeShip([6, 8], new Ship(3, "submarine", true));
    // playerBoard.placeShip([7, 2], new Ship(2, "cruiser", false));
    playerZero.placeShipsRandom();
    domManage.drawPlayerBoard(playerBoard.board);

    computer.placeShipsRandom(); // computer gets its ships randomized
    domManage.drawCompBoard(computerBoard.board);
    computer.setTurn();
  }

  function gameOver() {
    let playerWon = false;
    let compWon = false;
    function playerWonFunc() {
      for (let i = 0; i < 10; i += 1) {
        if (computerBoard.board[i].includes("S")) {
          playerWon = false;
          return playerWon;
        }
      }
      playerWon = true;
      return playerWon;
    }

    function compWonFunc() {
      for (let i = 0; i < 10; i += 1) {
        if (playerBoard.board[i].includes("S")) {
          compWon = false;
          return compWon;
        }
      }
      compWon = true;
      return compWon;
    }

    playerWonFunc();
    compWonFunc();

    if (playerWon) {
      alert("YOU WON");
    }
    if (compWon) {
      alert("YOU LOSE");
    }
  }
  function gameplay() {
    console.log(computerBoard.board);
    if (playerZero.turn) {
      for (const cell of compBoard) {
        cell.addEventListener("click", (e) => {
          const x = e.target.dataset.x;
          const y = e.target.dataset.y;
          if (playerZero.attack(x, y)) {
            computerBoard.receiveAttack(x, y);
            gameOver();
            domManage.updateBoard(e.target);
            playerZero.setTurn();
            computer.setTurn();
          }
          if (computer.turn) {
            // computer attacks randomly after player attacks
            const attack = computer.compAttack();
            playerBoard.receiveAttack(attack[0], attack[1]);
            domManage.updatePlayerBoard(attack[0], attack[1]);
            gameOver();
            playerZero.setTurn();
            computer.setTurn();
          }
        });
      }
    }
  }
  return { startGame, gameplay };
}

export default game;
