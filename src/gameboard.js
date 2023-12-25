import Ship from "./ship";

class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.#generateBoard(size);
  }

  #generateBoard(size = this.size) {
    const rows = new Array(size);
    for (let i = 0; i < rows.length; i += 1) {
      rows[i] = new Array(size);
    }
    return rows;
  }
}

export default Gameboard;
