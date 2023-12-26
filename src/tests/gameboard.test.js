import gameboard from "../gameboard";

const gBoard = gameboard();

test("Gameboard size test", () => {
  for (let i = 0; i < 10; i += 1) {
    expect(gBoard.board[10].length).toBe(11);
  }
});
