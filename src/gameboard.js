import Ship from "./ship";

function gameboard() {
  const board = Array(10);
  for (let i = 0; i < board.length; i += 1) [(board[i] = new Array(10))];

  return board;
}

export default gameboard;
