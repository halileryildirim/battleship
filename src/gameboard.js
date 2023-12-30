// import Ship from "./ship";

function gameboard() {
  const board = Array(10);
  for (let i = 0; i < board.length; i += 1) {
    const rows = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "];
    board[i] = rows;
  }

  const ships = [];

  function placeShip([row, col], ship) {
    const shipSize = ship.length;

    if (ship.vertical) {
      if (row + shipSize > 10) {
        return false;
      }

      for (let i = row; i < row + shipSize; i += 1) {
        if (board[i][col] === "S") {
          return false;
        }
      }

      for (let i = row; i < row + shipSize; i += 1) {
        board[i][col] = "S";
      }
      ships.push(ship);
      return true;
    }

    if (col + shipSize > 10) {
      return false;
    }

    for (let i = col; i < col + shipSize; i += 1) {
      if (board[row][i] === "S") {
        return false;
      }
    }

    for (let i = col; i < col + shipSize; i += 1) {
      board[row][i] = "S";
    }
    ships.push(ship);
    return true;
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
