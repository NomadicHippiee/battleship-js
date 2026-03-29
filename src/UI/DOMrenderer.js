// Render header with current player turn or winner
function renderHeader(gameController) {
  const header = document.getElementById("header");
  
  if (gameController.isGameOver()) {
    const winner = gameController.player1.gameboard.allShipsSunk() 
      ? gameController.player2.name 
      : gameController.player1.name;
    header.innerHTML = `
      <h1>⚓ BATTLESHIP</h1>
      <p style="color: #ffd700; font-size: 1.3em; font-weight: bold;">${winner} WINS!</p>
    `;
  } else {
    header.innerHTML = `
      <h1>⚓ BATTLESHIP</h1>
      <p>Current Turn: ${gameController.currentPlayer.name}</p>
    `;
  }
}

// Render a single board grid
function renderBoard(gameboard, gridContainerId, showShips, selectedShip = null) {
  const container = document.getElementById(gridContainerId);
  container.innerHTML = "";

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.id = `cell-${x}-${y}`;
      cell.dataset.x = x;
      cell.dataset.y = y;

      if (showShips && gameboard.grid[y][x]) {
        const ship = gameboard.grid[y][x];
        cell.classList.add("ship");
        
        // Highlight selected ship
        if (selectedShip && ship === selectedShip) {
          cell.classList.add("selected");
        }
      }

      // Check if cell was attacked
      const attackState = gameboard.wasAttacked(x, y);
      if (attackState === "hit") {
        cell.classList.add("hit");
      } else if (attackState === "miss") {
        cell.classList.add("miss");
      }

      container.appendChild(cell);
    }
  }
}

// Render ship status list
function renderShipStatus(player, shipContainerId, selectedShip = null) {
  const container = document.getElementById(shipContainerId);
  container.innerHTML = `<h3>${player.name}'s Ships</h3>`;

  player.gameboard.ships.forEach((ship) => {
    const shipItem = document.createElement("div");
    shipItem.className = "ship-item";

    if (ship.isSunk()) {
      shipItem.classList.add("sunk");
    } else {
      shipItem.classList.add("alive");
    }

    // Highlight selected ship with yellow class
    if (selectedShip && ship === selectedShip) {
      shipItem.classList.add("selected");
    }

    shipItem.textContent = `${ship.name} | Length: ${ship.length} | Hits: ${ship.hits}/${ship.length}`;
    container.appendChild(shipItem);
  });
}

export { renderHeader, renderBoard, renderShipStatus };
