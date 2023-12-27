import gameboard from "../src/gameboard";
import Ship from "../src/ship";

const board = gameboard();
const carrier = new Ship(6);

test("Gameboard to be array", () => {
  for (let i = 0; i < 9; i += 1) {
    expect(board.board[i].length).toBe(10);
  }
});

// Deploy ships, prevent to deploy on top of ships, check the amount of ships on gameboard.

test("Ship deployment", () => {
  expect(board.ships.length).toBe(0);
  carrier.rotate(); // horizontal deploy
  expect(board.placeShip([8, 0], carrier)).toBeTruthy();
  carrier.rotate(); // vertical deploy
  expect(board.placeShip([0, 0], carrier)).toBeTruthy();
  expect(board.placeShip([0, 0], carrier)).toBeFalsy();
  expect(board.placeShip([3, 1], carrier)).toBeFalsy(); // deploy start is not crossing with a ship but the final location is encountering a ship so cant be deployed
  expect(board.placeShip([0, 6], carrier)).toBeTruthy();
  carrier.rotate(); // horizontal deploy
  expect(board.placeShip([3, 1], carrier)).toBeFalsy();
  expect(board.ships.length).toBe(3);
});

test("Receive an attack", () => {
  expect(board.receiveAttack(3, 3)).toBeFalsy();
  expect(board.receiveAttack(8, 4)).toBeTruthy();
  expect(board.receiveAttack(8, 4)).toBeFalsy();
  expect(board.receiveAttack(3, 3)).toBeFalsy();
});
