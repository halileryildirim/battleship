import gameboard from "../gameboard";
import Ship from "../ship";

const board = gameboard();
const carrier = new Ship(6);

test("Gameboard to be array", () => {
  for (let i = 0; i < 9; i += 1) {
    expect(board.board[i].length).toBe(10);
  }
});

// Deploy ships, prevent to deploy on top of ships, check the amount of ships on gameboard after every attempt.

// test("Vertical ship deployment", () => {
//   expect(board.ships.length).toBe(0);
//   expect(board.placeShip([0, 0], carrier)).toBe("Ship deployed successfuly.");
//   expect(board.placeShip([0, 0], carrier)).toBe("Ship deployment failed.");
//   expect(board.placeShip([0, 1], carrier)).toBe("Ship deployed successfuly.");
//   expect(board.placeShip([0, 1], carrier)).toBe("Ship deployment failed.");
//   expect(board.placeShip([2, 0], carrier)).toBe("Ship deployment failed.");
//   expect(board.ships.length).toBe(2);
// });

// test("Horizontal ship deployment", () => {
//   carrier.rotate();
//   expect(board.ships.length).toBe(2);
//   expect(board.placeShip([9, 1], carrier)).toBe("Ship deployed successfuly.");
//   expect(board.placeShip([8, 0], carrier)).toBe("Ship deployed successfuly.");
//   expect(board.ships.length).toBe(4);
// });

test("Ship deployment", () => {
  expect(board.ships.length).toBe(0);
  carrier.rotate(); // horizontal deploy
  expect(board.placeShip([8, 0], carrier)).toBe("Ship deployed successfuly.");
  carrier.rotate(); // vertical deploy
  expect(board.placeShip([0, 0], carrier)).toBe("Ship deployed successfuly.");
  expect(board.placeShip([0, 0], carrier)).toBe("Ship deployment failed.");
  expect(board.placeShip([3, 1], carrier)).toBe("Ship deployment failed."); // deploy start is not crossing with a ship but the final location is encountering a ship so cant be deployed
  expect(board.placeShip([0, 6], carrier)).toBe("Ship deployed successfuly.");
  carrier.rotate();
  expect(board.placeShip([3, 1], carrier)).toBe("Ship deployment failed.");
  expect(board.ships.length).toBe(3);
  console.log(board.board);
});
