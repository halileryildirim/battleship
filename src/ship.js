class Ship {
  constructor(length, name, hits = 0, vertical = true, sunk = false) {
    this.length = length;
    this.hits = hits;
    this.sunk = sunk;
    this.vertical = vertical;
    this.name = name;
  }

  hit() {
    this.hits += 1;
  }

  rotate() {
    this.vertical === true ? (this.vertical = false) : (this.vertical = true);
  }

  isSunk() {
    if (this.hits === this.length) this.sunk = true;
    return this.sunk;
  }
}

export default Ship;
