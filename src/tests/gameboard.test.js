import gameboard from "../gameboard";

const board = gameboard();

test("Gameboard to be array", () => {
  for (let i = 0; i < 9; i += 1) {
    expect(board.board[i].length).toBe(10);
  }
});

test("Ship deployment", () => {
  // Deploy ships, prevent to deploy on top of ships, check the amount of ships on gameboard after every attempt.
  const shipSize = 6;
  expect(board.placeShip([0, 0], shipSize)).toBe("Ship deployed successfuly.");
  expect(board.ships.length).toBe(1);
  expect(board.placeShip([0, 0], shipSize)).toBe("Ship deployment failed.");
  expect(board.ships.length).toBe(1);
  expect(board.placeShip([0, 1], shipSize)).toBe("Ship deployed successfuly.");
  expect(board.ships.length).toBe(2);
  expect(board.placeShip([0, 1], shipSize)).toBe("Ship deployment failed.");
  expect(board.ships.length).toBe(2);
  expect(board.placeShip([2, 0], shipSize)).toBe("Ship deployment failed.");
  expect(board.ships.length).toBe(2);
});
