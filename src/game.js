import player from "./player";

function game() {
  const playerZero = player();
  const playerBoard = playerZero.board;

  const computer = player();
  const computerBoard = computer.board;

  function startGame() {
    playerZero.placeShipsRandom();
    playerZero.setTurn(true);

    computer.placeShipsRandom();
    computer.setTurn(false);
  }

  function gameplay() {
    while (playerZero.turn) {
      // event listener for cells
      // every cell click updates the cell with updateBoard from DOM.js and gameBoard receiveAttack
      // if a valid click is confirmed playerZero.turn = false, computer.turn = true
      // also append a message like your turn maybe?
    }
    while (computer.turn) {
      // no need for cell listeners
      // receive the attack info and updateBoard with DOM.js and gameBoard receiveAttack
      // if attack is valid computer.turn = false, playerZero.turn = true
    }
  }

  return { startGame, gameplay };
}

export default game;
