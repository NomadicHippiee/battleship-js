export default class Gameboard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
    this.grid = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => null),
    );
  }

  placeShip(ship, x, y, direction) {
    if (direction === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        this.grid[y][x + i] = ship;
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        this.grid[y + i][x] = ship;
      }
    }
    this.ships.push(ship);
  }

  getShipAt(x, y) {
    return this.grid[y][x];
  }

  receiveAttack(x, y) {
    let ship = this.grid[y][x];

    if (ship) {
      ship.hit();
      return { hit: true };
    } else {
      this.missedAttacks.push([x, y]);
      return { hit: false };
    }
  }

  wasAttacked(x, y) {
    for (let coord of this.missedAttacks) {
      if (coord[0] === x && coord[1] === y) {
        return 'miss';
      }
    }

    const ship = this.getShipAt(x, y);
    if (ship && ship.hits > 0) {
      return 'hit';
    }

    return null;
  }

  allShipsSunk() {
  return this.ships.length > 0 && this.ships.every(ship => ship.isSunk());
  }
}
