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
      document.querySelector("#winner").textContent = "YOU WIN!";
    }
    if (compWon) {
      document.querySelector("#winner").textContent = "YOU LOSE";
    }
    playerWon = playerWonFunc();
    return { playerWon };
  }

  function handleTurns() {
    return function listener(e) {
      const x = e.target.dataset.x;
      const y = e.target.dataset.y;
      if (playerZero.attack(x, y)) {
        console.log(gameOver());
        console.log(computerBoard.board);
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
      if (gameOver().playerWon) {
        document
          .querySelector("#computer-board")
          .removeEventListener("click", listener);
      }
    };
  }

  function gameplay() {
    for (const cell of compBoard) {
      cell.addEventListener("click", handleTurns());
    }
  }
  return { startGame, gameplay };
}

export default game;
