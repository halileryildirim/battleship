import gameboard from "../gameboard";

const board = gameboard();

test("Gameboard to be array", () => {
  for (let i = 0; i < 10; i += 1) {
    expect(board[i].length).toBe(10);
  }
});
