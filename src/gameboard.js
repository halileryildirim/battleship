import Ship from "./ship";

function gameboard() {
  const board = Array(10);
  for (let i = 0; i < board.length; i += 1) {
    board[i] = new Array(10);
  }

  const ships = [];

  function placeShip([row, col], shipSize) {
    // update empty array elements as S when a ship placed
    // if placing S is impossible dont allow to place (out of boundaries or the element already is an S)
    // dont allow placement to nearby nodes  a 5,5 5,6 5,7 cant place to previous row, next row, next and previous column of the ship
    // ship index can be taken and update the index for the length of size to place and test if placeable but vertical and horizontal state is important

    // vertical ship placement
    const ship = new Ship(shipSize);
    if (ship.vertical) {
      if (row + shipSize < 10 && board[row][col] !== "S") {
        for (let i = row; i < shipSize; i += 1) {
          board[i][col] = "S";
        }
        ships.push(ship);
        return "Ship deployed successfuly.";
      }
      return "Ship deployment failed.";
    }
  }
  return { board, ships, placeShip };
}

export default gameboard;
