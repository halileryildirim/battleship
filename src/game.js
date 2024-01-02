import player from "./player";
import domLoader from "./dom";

const domManage = domLoader();

function game() {
  let playerZero = player();
  let computer = player();
  let playerBoard = playerZero.board;
  let computerBoard = computer.board;
  const compBoard = document.querySelectorAll("#computer-board");

  const shuffleHandler = (function () {
    let shuffleListener;

    function playerShuffle() {
      return function listener() {
        playerZero = player();
        playerZero.placeShipsRandom();
        playerBoard = playerZero.board;
        domManage.drawPlayerBoard(playerBoard.board);
      };
    }

    function shuffleShips() {
      shuffleListener = playerShuffle();
      document
        .querySelector("#randomize-button")
        .addEventListener("click", shuffleListener);
    }

    function removeShuffleListener() {
      if (shuffleListener) {
        document
          .querySelector("#randomize-button")
          .removeEventListener("click", shuffleListener);
      }
    }

    return {
      shuffleShips,
      removeShuffleListener,
    };
  })();

  function startGame() {
    playerZero.placeShipsRandom();
    computer.placeShipsRandom();

    domManage.drawPlayerBoard(playerBoard.board);
    domManage.drawCompBoard(computerBoard.board);
    computer.setTurn();
    shuffleHandler.shuffleShips();
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
      domManage.endingScreen("YOU");
    } else if (compWon) {
      domManage.endingScreen("COMPUTER");
    }

    playerWon = playerWonFunc();
    compWon = compWonFunc();
    return { playerWon, compWon };
  }

  function handleTurns() {
    return function listener(e) {
      const x = e.target.dataset.x;
      const y = e.target.dataset.y;
      if (playerZero.attack(x, y)) {
        gameRestart();
        shuffleHandler.removeShuffleListener();
        computerBoard.receiveAttack(x, y);
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
      if (gameOver().playerWon || gameOver().compWon) {
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

  function gameRestart() {
    document.querySelector("#reset-button").addEventListener("click", () => {
      playerZero = player();
      computer = player();
      playerBoard = playerZero.board;
      computerBoard = computer.board;
      startGame();
      gameplay();
      document.querySelector("#ending-screen").replaceChildren();
    });
  }
  return { startGame, gameplay };
}

export default game;
