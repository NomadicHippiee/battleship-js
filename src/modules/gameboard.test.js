import Gameboard from './gameboard.js';
import Ship from './ship.js';

describe('Gameboard', () => {
  
  test('should place a ship at given coordinates', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    expect(gameboard.getShipAt(0, 0)).toBe(ship);
  });

  test('should record a hit when attack hits a ship', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    const result = gameboard.receiveAttack(0, 0);
    expect(result.hit).toBe(true);
  });

  test('should record a miss when attack misses', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    const result = gameboard.receiveAttack(5, 5);
    expect(result.hit).toBe(false);
  });

  test('should return true for allShipsSunk() when all ships sunk', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(2);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(1, 0);
    expect(gameboard.allShipsSunk()).toBe(true);
  });

  test('should return false for allShipsSunk() when ships remain', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);
    gameboard.placeShip(ship, 0, 0, 'horizontal');
    gameboard.receiveAttack(0, 0);
    expect(gameboard.allShipsSunk()).toBe(false);
  });

});