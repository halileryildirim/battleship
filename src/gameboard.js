// import Ship from "./ship";

function gameboard() {
  const board = Array(10);
  for (let i = 0; i < board.length; i += 1) {
    const rows = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "];
    board[i] = rows;
  }

  const ships = [];

  function placeShip([row, col], ship) {
    // vertical ship placement
    const shipSize = ship.length;
    if (ship.vertical === true) {
      if (
        row + shipSize < 10 &&
        board[row][col] !== "S" &&
        board[row][col] !== "s"
      ) {
        for (let i = 0; i < shipSize; i += 1) {
          if (board[row + i][col] !== "S" && board[row][col] !== "s") {
            board[row + i][col] = "S";
            if (col + 1 < 10) board[row + i][col + 1] = "s";
            if (col - 1 >= 0) board[row + i][col - 1] = "s";
            if (row - 1 >= 0) board[row - 1][col] = "s";
            if (row + shipSize < 10) board[row + shipSize][col] = "s";
            if (row - 1 >= 0 && col - 1 >= 0) board[row - 1][col - 1] = "s";
            if (row - 1 >= 0 && col + 1 < 10) board[row - 1][col + 1] = "s";
            if (row + shipSize < 10 && col - 1 >= 0)
              board[row + shipSize][col - 1] = "s";
            if (row + shipSize < 10 && col + 1 < 10)
              board[row + shipSize][col + 1] = "s";
          } else {
            i = 0;
            while (i < shipSize) {
              if (board[row + i][col] !== undefined) {
                board[row + i][col] = " ";
                i += 1;
              }
            }
            return false;
          }
        }
        ships.push(ship);
        return true;
      }
      return false;
    }
    // horizontal ship placements
    if (ship.vertical === false) {
      if (
        col + shipSize < 10 &&
        board[row][col] !== "S" &&
        board[row][col] !== "s"
      ) {
        for (let i = 0; i < shipSize; i += 1) {
          if (board[row][col + i] !== "S" && board[row][col] !== "s") {
            board[row][col + i] = "S";
            if (row + 1 < 10) board[row + 1][col + i] = "s";
            if (row - 1 >= 0) board[row - 1][col + i] = "s";
            if (col - 1 >= 0) board[row][col - 1] = "s";
            if (col + shipSize < 10) board[row][col + shipSize] = "s";
            if (row - 1 >= 0 && col - 1 >= 0) board[row - 1][col - 1] = "s";
            if (row + 1 < 10 && col - 1 >= 0) board[row + 1][col - 1] = "s";

            if (row - 1 >= 0 && col + shipSize < 10)
              board[row - 1][col + shipSize] = "s";
            if (row + 1 < 10 && col + shipSize < 10)
              board[row + 1][col + shipSize] = "s";
          } else {
            i = 0;
            while (i < shipSize) {
              if (board[row][col + i] !== undefined) {
                board[row][col + i] = " ";
                i += 1;
              }
            }
            return false;
          }
        }
        ships.push(ship);
        return true;
      }
    }
    return false;
  }

  function receiveAttack(x, y) {
    // receive the attack , check if its hit first then if there's a ship or water update.
    if (board[x][y] !== "H") {
      if (board[x][y] === "S") {
        // initiate ship hit when actual ships are used for ship placement ship.hit()
        // After every successful attack check if they're sunk
        // If a ship sinks filter ships from sunk ships end the game when ships are empty
        board[x][y] = "H";
        return true;
      }
      board[x][y] = "H";
      return false;
    }
    return false;
  }

  return { board, ships, placeShip, receiveAttack };
}

export default gameboard;
