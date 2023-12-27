import player from "../src/player";

const playerZero = player();
test("Player test", () => {
  playerZero.placeShipsRandom();
  expect(playerZero.board.ships.length).toBe(5);
});
