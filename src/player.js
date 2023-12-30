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
      attacks.push(`(${x},${y})`);
      return [x, y];
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
    const carrier = new Ship(6, "carrier");
    const battleship = new Ship(4, "battleship");
    const destroyer = new Ship(3, "destroyer");
    const submarine = new Ship(3, "submarine");
    const cruiser = new Ship(2, "cruiser");

    if (board.ships.length !== 5) {
      let randomX = Math.floor(Math.random() * 10);
      let randomY = Math.floor(Math.random() * 10);

      if (!board.placeShip([randomX, randomY], carrier)) {
        while (!board.placeShip([randomX, randomY], carrier)) {
          carrier.rotate();
          randomX = Math.floor(Math.random() * 10);
          randomY = Math.floor(Math.random() * 10);
        }
      }
      randomX = Math.floor(Math.random() * 10);
      randomY = Math.floor(Math.random() * 10);

      if (!board.placeShip([randomX, randomY], battleship)) {
        while (!board.placeShip([randomX, randomY], battleship)) {
          battleship.rotate();
          randomX = Math.floor(Math.random() * 10);
          randomY = Math.floor(Math.random() * 10);
        }
      }

      randomX = Math.floor(Math.random() * 10);
      randomY = Math.floor(Math.random() * 10);

      if (!board.placeShip([randomX, randomY], destroyer)) {
        while (!board.placeShip([randomX, randomY], destroyer)) {
          destroyer.rotate();
          randomX = Math.floor(Math.random() * 10);
          randomY = Math.floor(Math.random() * 10);
        }
      }

      randomX = Math.floor(Math.random() * 10);
      randomY = Math.floor(Math.random() * 10);

      if (!board.placeShip([randomX, randomY], submarine)) {
        while (!board.placeShip([randomX, randomY], submarine)) {
          submarine.rotate();
          randomX = Math.floor(Math.random() * 10);
          randomY = Math.floor(Math.random() * 10);
        }
      }

      randomX = Math.floor(Math.random() * 10);
      randomY = Math.floor(Math.random() * 10);

      if (!board.placeShip([randomX, randomY], cruiser)) {
        while (!board.placeShip([randomX, randomY], cruiser)) {
          cruiser.rotate();
          randomX = Math.floor(Math.random() * 10);
          randomY = Math.floor(Math.random() * 10);
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
