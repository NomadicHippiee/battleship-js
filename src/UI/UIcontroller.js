import { renderHeader, renderBoard, renderShipStatus } from './DOMrenderer.js';
import Ship from '../modules/ship.js';

let selectedShip = null;
let gamePhase = 'PLACEMENT'; // PLACEMENT or PLAYING

function getShipAt(gameboard, x, y) {
  return gameboard.ships.find(ship => {
    if (ship.direction === 'horizontal') {
      return ship.y === y && x >= ship.x && x < ship.x + ship.length;
    } else {
      return ship.x === x && y >= ship.y && y < ship.y + ship.length;
    }
  });
}

function resetGameboardWithRandomShips(gameboard) {
  // Clear existing ships
  gameboard.ships = [];
  gameboard.grid = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => null),
  );
  gameboard.missedAttacks = [];
  gameboard.hitAttacks = [];

  // Create 5 new ships
  const ships = [
    new Ship(5, 'Carrier'),
    new Ship(4, 'Battleship'),
    new Ship(3, 'Destroyer'),
    new Ship(3, 'Submarine'),
    new Ship(2, 'Patrol Boat'),
  ];

  // Randomly place each ship
  ships.forEach(ship => {
    let placed = false;
    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
      
      try {
        gameboard.placeShip(ship, x, y, direction);
        placed = true;
      } catch (e) {
        // Ship overlap or out of bounds, try again
      }
    }
  });
}

function handleGameOver(gameController) {
  // Reset both gameboards with new ships
  resetGameboardWithRandomShips(gameController.player1.gameboard);
  resetGameboardWithRandomShips(gameController.player2.gameboard);
  
  // Switch back to PLACEMENT phase
  gamePhase = 'PLACEMENT';
  selectedShip = null;
  
  // Show placement UI
  document.querySelectorAll('.placement-only').forEach(element => {
    element.classList.remove('hidden');
  });
  
  updateDisplay(gameController);
}

function setupEventListeners(gameController) {
  const opponentGrid = document.getElementById('opponentGrid');
  const playerGrid = document.getElementById('playerGrid');
  const startGameBtn = document.getElementById('startGameBtn');

  // Player board - for ship placement/selection (only during PLACEMENT phase)
  playerGrid.addEventListener('click', (e) => {
    if (gamePhase !== 'PLACEMENT') return;
    
    if (!e.target.classList.contains('cell')) return;

    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);
    const shipAtCell = getShipAt(gameController.player1.gameboard, x, y);

    if (shipAtCell) {
      // Clicked on a ship - select it (switches if different ship)
      selectedShip = shipAtCell;
      updateDisplay(gameController);
    } else if (selectedShip) {
      // Clicked empty cell with ship selected - try to move it
      try {
        gameController.player1.gameboard.moveShip(selectedShip, x, y);
        // Deselect after successful move
        selectedShip = null;
        updateDisplay(gameController);
      } catch (error) {
        console.log('Cannot move ship:', error.message);
        // Ship stays selected, user can try another location
        updateDisplay(gameController);
      }
    }
  });

  // Opponent board is clickable during PLAYING phase
  opponentGrid.addEventListener('click', (e) => {
    if (gamePhase !== 'PLAYING') return;
    
    if (!e.target.classList.contains('cell')) return;

    // Only human player can attack
    if (gameController.currentPlayer.isComputer()) {
      console.log('Wait for computer turn');
      return;
    }

    const x = parseInt(e.target.dataset.x);
    const y = parseInt(e.target.dataset.y);

    // Make the attack
    const success = gameController.playerAttack(x, y);
    
    if (!success) {
      console.log('Invalid attack - already attacked this coordinate');
      return;
    }

    // Update display
    updateDisplay(gameController);

    // Check if player attack ended the game
    if (gameController.isGameOver()) {
      setTimeout(() => {
        handleGameOver(gameController);
      }, 2000);
      return;
    }

    // Computer attacks after a short delay
    if (!gameController.isGameOver()) {
      setTimeout(() => {
        gameController.computerAttack();
        updateDisplay(gameController);
        
        // Check if computer attack ended the game
        if (gameController.isGameOver()) {
          setTimeout(() => {
            handleGameOver(gameController);
          }, 2000);
        }
      }, 1000);
    }
  });

  // R key to rotate selected ship (only during PLACEMENT phase)
  document.addEventListener('keydown', (e) => {
    if (gamePhase !== 'PLACEMENT') return;
    
    if (e.key.toUpperCase() === 'R' && selectedShip) {
      try {
        gameController.player1.gameboard.rotateShip(selectedShip);
        updateDisplay(gameController);
      } catch (error) {
        console.log('Cannot rotate ship:', error.message);
      }
    }
  });

  // Start Game button
  startGameBtn.addEventListener('click', () => {
    gamePhase = 'PLAYING';
    selectedShip = null;
    
    // Hide placement UI
    document.querySelectorAll('.placement-only').forEach(element => {
      element.classList.add('hidden');
    });
    
    updateDisplay(gameController);
  });
}

function updateDisplay(gameController) {
  renderHeader(gameController);
  
  // Show selected ship to player only during PLACEMENT phase
  const showSelectedShip = gamePhase === 'PLACEMENT' ? selectedShip : null;
  renderBoard(gameController.player1.gameboard, 'playerGrid', true, showSelectedShip);
  renderBoard(gameController.player2.gameboard, 'opponentGrid', false);
  renderShipStatus(gameController.player1, 'playerShips', showSelectedShip);
  renderShipStatus(gameController.player2, 'opponentShips');
}

export { setupEventListeners, updateDisplay };
