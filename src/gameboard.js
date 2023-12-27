import Ship from "./ship";

function gameboard() {
  const board = Array(10);
  for (let i = 0; i < board.length; i += 1) {
    const rows = Array(10);
    board[i] = rows;
  }

  const ships = [];

  function placeShip([row, col], ship) {
    // vertical ship placement
    const shipSize = ship.length;
    if (ship.vertical) {
      if (row + shipSize < 10 && board[row][col] !== "S") {
        for (let i = 0; i < shipSize; i += 1) {
          if (board[row + i][col] !== "S") board[row + i][col] = "S";
          else {
            while (i >= 0) {
              delete board[row + i - 1][col];
              i -= 1;
            }
            return false;
          }
        }
        ships.push(ship);
        return true;
      }
      return false;
    }

    // horizontal ship placement
    if (col + shipSize < 10 && board[row][col] !== "S") {
      for (let i = 0; i < shipSize; i += 1) {
        if (board[row][col + i] !== "S") board[row][col + i] = "S";
        else {
          while (i > 0) {
            delete board[row][col + i - 1];
            i -= 1;
          }
          return false;
        }
      }
      ships.push(ship);
      return true;
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
