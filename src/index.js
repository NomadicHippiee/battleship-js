import './style.css';
import GameController from './modules/gamecontroller.js';
import Ship from './modules/ship.js';
import { setupEventListeners, updateDisplay } from './UI/UIcontroller.js';

function main() {
  // Create game
  const game = new GameController();

  // All 5 ships
  const ships = [
    new Ship(5, 'Carrier'),
    new Ship(4, 'Battleship'),
    new Ship(3, 'Destroyer'),
    new Ship(3, 'Submarine'),
    new Ship(2, 'Patrol Boat'),
  ];

  // Randomly place player ships
  ships.forEach(ship => {
    let placed = false;
    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
      
      // Try to place - if it fails, try again
      try {
        game.player1.gameboard.placeShip(ship, x, y, direction);
        placed = true;
      } catch (e) {
        // Ship overlap or out of bounds, try again
      }
    }
  });

  // Randomly place computer ships
  const computerShips = [
    new Ship(5, 'Carrier'),
    new Ship(4, 'Battleship'),
    new Ship(3, 'Destroyer'),
    new Ship(3, 'Submarine'),
    new Ship(2, 'Patrol Boat'),
  ];

  computerShips.forEach(ship => {
    let placed = false;
    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
      
      try {
        game.player2.gameboard.placeShip(ship, x, y, direction);
        placed = true;
      } catch (e) {
        // Ship overlap or out of bounds, try again
      }
    }
  });

  // Render initial state
  updateDisplay(game);

  // Setup click listeners
  setupEventListeners(game);
}

main();
