import player from "../src/player";

const playerZero = player();
playerZero.placeShipsRandom();
test("Player test", () => {
  expect(playerZero.board.ships.length).toBe(5);
  expect(playerZero.turn).toBeTruthy();
  playerZero.setTurn(false);
  expect(playerZero.turn).toBeFalsy();
  playerZero.setTurn(true);
  expect(playerZero.turn).toBeTruthy();
});
