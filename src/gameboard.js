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
  const ships = [];
  function placeShip() {
    const ship = new Ship(5);
    ships.push(ship);
  }
  return { board, placeShip };
}

export default gameboard;
