export default class Gameboard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
    this.hitAttacks = [];
    this.grid = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => null),
    );
  }

  placeShip(ship, x, y, direction) {
    // Validate placement
    if (direction === "horizontal") {
      // Check bounds
      if (x + ship.length > 10) {
        throw new Error('Ship out of bounds');
      }
      // Check overlap
      for (let i = 0; i < ship.length; i++) {
        if (this.grid[y][x + i] !== null) {
          throw new Error('Ship overlap');
        }
      }
      // Place ship
      for (let i = 0; i < ship.length; i++) {
        this.grid[y][x + i] = ship;
      }
    } else if (direction === "vertical") {
      // Check bounds
      if (y + ship.length > 10) {
        throw new Error('Ship out of bounds');
      }
      // Check overlap
      for (let i = 0; i < ship.length; i++) {
        if (this.grid[y + i][x] !== null) {
          throw new Error('Ship overlap');
        }
      }
      // Place ship
      for (let i = 0; i < ship.length; i++) {
        this.grid[y + i][x] = ship;
      }
    }
    
    ship.x = x;
    ship.y = y;
    ship.direction = direction;
    
    // Only add to ships array if not already there
    if (!this.ships.includes(ship)) {
      this.ships.push(ship);
    }
  }

  getShipAt(x, y) {
    return this.grid[y][x];
  }

  receiveAttack(x, y) {
    let ship = this.grid[y][x];

    if (ship) {
      ship.hit();
      this.hitAttacks.push([x, y]);
      return { hit: true };
    } else {
      this.missedAttacks.push([x, y]);
      return { hit: false };
    }
  }

  wasAttacked(x, y) {
    for (let coord of this.hitAttacks) {
      if (coord[0] === x && coord[1] === y) {
        return 'hit';
      }
    }

    for (let coord of this.missedAttacks) {
      if (coord[0] === x && coord[1] === y) {
        return 'miss';
      }
    }

    return null;
  }

  allShipsSunk() {
    return this.ships.length > 0 && this.ships.every(ship => ship.isSunk());
  }

  moveShip(ship, x, y) {
    // Store original state in case move fails
    const oldX = ship.x;
    const oldY = ship.y;
    const oldDirection = ship.direction;
    
    try {
      // Remove ship from old position
      this.clearShip(ship);
      
      // Try to place at new position
      this.placeShip(ship, x, y, ship.direction);
    } catch (error) {
      // Restore ship to original position
      ship.x = oldX;
      ship.y = oldY;
      ship.direction = oldDirection;
      
      // Re-place ship at original position
      for (let i = 0; i < ship.length; i++) {
        if (oldDirection === 'horizontal') {
          this.grid[oldY][oldX + i] = ship;
        } else {
          this.grid[oldY + i][oldX] = ship;
        }
      }
      
      throw error;
    }
  }

  rotateShip(ship) {
    // Store original state in case rotation fails
    const oldX = ship.x;
    const oldY = ship.y;
    const oldDirection = ship.direction;
    
    try {
      // Clear old placement
      this.clearShip(ship);
      
      // Rotate direction
      const newDirection = ship.direction === 'horizontal' ? 'vertical' : 'horizontal';
      
      // Try to place with new direction (this will throw if invalid)
      this.placeShip(ship, ship.x, ship.y, newDirection);
    } catch (error) {
      // Restore ship to original position and rethrow error
      ship.x = oldX;
      ship.y = oldY;
      ship.direction = oldDirection;
      
      // Re-place ship at original position
      for (let i = 0; i < ship.length; i++) {
        if (oldDirection === 'horizontal') {
          this.grid[oldY][oldX + i] = ship;
        } else {
          this.grid[oldY + i][oldX] = ship;
        }
      }
      
      throw error;
    }
  }

  clearShip(ship) {
    // Remove ship from grid
    for (let i = 0; i < ship.length; i++) {
      if (ship.direction === 'horizontal') {
        this.grid[ship.y][ship.x + i] = null;
      } else {
        this.grid[ship.y + i][ship.x] = null;
      }
    }
  }
}
