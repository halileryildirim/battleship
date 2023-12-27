import gameboard from "./gameboard";
import Ship from "./ship";

function player() {
  const board = gameboard();
  const turn = true;

  function setTurn(value) {
    this.turn = value;
  }

  function attack(x, y) {
    player.board.receiveAttack(x, y);
  }

  function compAttack() {
    const randomX = Math.floor(Math.random() * 10);
    const randomY = Math.floor(Math.random() * 10);
    return { randomX, randomY };
  }

  function placeShipsRandom() {
    const carrier = new Ship(6);
    const battleship = new Ship(4);
    const destroyer = new Ship(3);
    const submarine = new Ship(3);
    const cruiser = new Ship(2);

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

      if (!board.placeShip([randomX, randomY], battleship)) {
        while (!board.placeShip([randomX, randomY], battleship)) {
          battleship.rotate();
          randomX = Math.floor(Math.random() * 10);
          randomY = Math.floor(Math.random() * 10);
        }
      }

      if (!board.placeShip([randomX, randomY], destroyer)) {
        while (!board.placeShip([randomX, randomY], destroyer)) {
          destroyer.rotate();
          randomX = Math.floor(Math.random() * 10);
          randomY = Math.floor(Math.random() * 10);
        }
      }

      if (!board.placeShip([randomX, randomY], submarine)) {
        while (!board.placeShip([randomX, randomY], submarine)) {
          submarine.rotate();
          randomX = Math.floor(Math.random() * 10);
          randomY = Math.floor(Math.random() * 10);
        }
      }

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
    setTurn,
    attack,
    compAttack,
    placeShipsRandom,
  };
}

export default player;
