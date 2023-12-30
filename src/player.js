import gameboard from "./gameboard";
import Ship from "./ship";

function player() {
  const board = gameboard();
  const turn = false;
  const attacks = [];

  function setTurn(value) {
    this.turn = value;
  }

  function attack(x, y) {
    if (x < 10 && y < 10 && !attacks.includes(`(${x},${y})`)) {
      const playerAttack = `(${x},${y})`;
      attacks.push(playerAttack);
      return playerAttack;
    }
    return "Invalid Attack";
  }

  function compAttack() {
    let randomX = Math.floor(Math.random() * 10);
    let randomY = Math.floor(Math.random() * 10);
    while (attacks.includes(`(${randomX},${randomY})`)) {
      randomX = Math.floor(Math.random() * 10);
      randomY = Math.floor(Math.random() * 10);
    }
    attacks.push(`(${randomX},${randomY})`);
    return [randomX, randomY];
  }

  function placeShipsRandom() {
    const shipsToPlace = [
      new Ship(6, "carrier", true),
      new Ship(4, "battleship", true),
      new Ship(3, "destroyer", true),
      new Ship(3, "submarine", true),
      new Ship(2, "cruiser", true),
    ];

    for (const ship of shipsToPlace) {
      let placed = false;

      while (!placed) {
        const randomX = Math.floor(Math.random() * 10);
        const randomY = Math.floor(Math.random() * 10);

        const orientation = Math.random() < 0.5;
        ship.vertical = orientation;

        if (board.placeShip([randomX, randomY], ship)) {
          placed = true;
        } else {
          ship.rotate();
        }
      }
    }
  }

  return {
    board,
    turn,
    attacks,
    setTurn,
    attack,
    compAttack,
    placeShipsRandom,
  };
}

export default player;
