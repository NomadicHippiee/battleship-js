export default class Ship {
  constructor(length, name = '') {
    this.length = length;
    this.name = name;
    this.hits = 0;
  }

  hit() {
     this.hits = this.hits + 1;
  }
  isSunk() {
    if (this.hits >= this.length) {
      return true;
    } else {
      return false;
    }
  }
}
