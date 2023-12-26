import Ship from "./ship";

function gameboard() {
  const board = Array.from(Array(10), () =>
    Array(10)
      .fill()
      .map(() => ({
        isHit: false,
        ship: null,
      }))
  );
  return { board };
}

export default gameboard;
