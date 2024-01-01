import player from "./player";
import domLoader from "./dom";

const domManage = domLoader();

function game() {
  let playerZero = player();
  let playerBoard = playerZero.board;
  const shuffle = document.querySelector("#randomize");

  const computer = player();
  const computerBoard = computer.board;
  const compBoard = document.querySelectorAll("#computer-board");

  function shuffleShips() {
    shuffle.addEventListener("click", () => {
      playerZero = player();
      playerZero.placeShipsRandom();
      playerBoard = playerZero.board;
      domManage.drawPlayerBoard(playerBoard.board);
    });
  }

  function startGame() {
    playerZero.placeShipsRandom();
    domManage.drawPlayerBoard(playerBoard.board);

    computer.placeShipsRandom();
    domManage.drawCompBoard(computerBoard.board);
    computer.setTurn();
    shuffleShips();
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
      alert("YOU WIN!");
    }
    if (compWon) {
      alert("YOU LOSE!");
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
            const attack = computer.compAttack();
            playerBoard.receiveAttack(attack[0], attack[1]);
            domManage.updatePlayerBoard(attack[0], attack[1]);
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
