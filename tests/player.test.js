import player from "../src/player";

const playerZero = player();
const playerOne = player();
playerZero.placeShipsRandom();

test("Player test", () => {
  expect(playerZero.board.ships.length).toBe(5);
  expect(playerZero.turn).toBeTruthy();
  playerZero.setTurn(false);
  expect(playerZero.turn).toBeFalsy();
  playerZero.setTurn(true);
  expect(playerZero.turn).toBeTruthy();

  expect(playerOne.board.ships.length).toBe(0);
  playerOne.setTurn(false);
  expect(playerOne.turn).toBeFalsy();
  expect(playerZero.turn).toBeTruthy();
  playerOne.placeShipsRandom();
  expect(playerOne.board.ships.length).toBe(5);
  playerOne.placeShipsRandom();
  expect(playerOne.board.ships.length).toBe(5);

  playerZero.attack(5, 3);
  expect(playerZero.attacks.length).toBe(1);
  expect(playerZero.attack(5, 3)).toBe("Invalid Attack");
  expect(playerZero.attacks.length).toBe(1);
  playerOne.compAttack();
  playerOne.compAttack();
  playerOne.compAttack();
  expect(playerOne.attacks.length).toBe(3);
});
