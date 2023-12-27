import Ship from "./ship";

function gameboard() {
  const board = Array(10);
  for (let i = 0; i < board.length; i += 1) {
    const rows = Array(10);
    board[i] = rows;
  }

  const ships = [];

  function placeShip([row, col], ship) {
    // update empty array elements as S when a ship placed
    // if placing S is impossible dont allow to place (out of boundaries or the element already is an S)
    // dont allow placement to nearby nodes  a 5,5 5,6 5,7 cant place to previous row, next row, next and previous column of the ship
    // ship index can be taken and update the index for the length of size to place and test if placeable but vertical and horizontal state is important

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
            return "Ship deployment failed.";
          }
        }
        ships.push(ship);
        return "Ship deployed successfuly.";
      }
      return "Ship deployment failed.";
    }

    if (col + shipSize < 10 && board[row][col] !== "S") {
      for (let i = 0; i < shipSize; i += 1) {
        if (board[row][col + i] !== "S") board[row][col + i] = "S";
        else {
          while (i > 0) {
            delete board[row][col + i - 1];
            i -= 1;
          }
          return "Ship deployment failed.";
        }
      }
      ships.push(ship);
      return "Ship deployed successfuly.";
    }
    return "Ship deployment failed.";
  }

  return { board, ships, placeShip };
}

export default gameboard;
