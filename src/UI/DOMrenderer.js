function renderHeader(currentPlayer) {
  const h1 = document.createElement("h1");
  h1.textContent = "⚓ BATTLESHIP";
  const turnIndicator = document.createElement("div");
  turnIndicator.classList.add("turn-indicator");
  turnIndicator.textContent = "Current turn" + currentPlayer.name;

  document.body.append(h1, turnIndicator);
}

function renderBoard(gameboard, title, showShips) {
  const container = document.createElement("div");
  container.classList.add("board-section");
  const titleHeading = document.createElement("h2");
  titleHeading.textContent = title;
  container.appendChild(titleHeading);
  const grid = document.createElement("div");
  grid.classList.add("game-grid");

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.id = "cell" + x + "-" + y;
      cell.dataset.x = x;
      cell.dataset.y = y;

      const ship = gameboard.getShipAt(x, y);

      if (showShips && ship) {
        cell.classList.add("ship");
      }

      const attack = gameboard.wasAttacked(x, y);
      if (attack === "hit") {
        cell.classList.add("hit");
      } else if (attack === "miss") {
        cell.classList.add("miss");
      }

      grid.appendChild(cell);
    }
  }

  container.appendChild(grid);
  return container;
}

function renderShipStatus(player) {
  const container = document.createElement("div");
  container.classList.add("ship-status");

  const heading = document.createElement("h3");
  heading.textContent = player.name + "s Ships";
  container.append(heading);

  player.gameboard.ships.forEach((ship) => {
    const shipContainer = document.createElement("div");
    shipContainer.classList.add("ship-item");
    const shipInfo = document.createElement("p");
    shipInfo.textContent =
      "Length: " + ship.length + " | Hits: " + ship.hits + "/" + ship.length;

    if (ship.isSunk()) {
      shipContainer.classList.add("sunk");
    } else {
      shipContainer.classList.add("alive");
    }

    shipContainer.append(shipInfo);
    container.append(shipContainer);
  });

  document.body.append(container);
  return container;
}

function updateBoardCell(x, y, state) {
    const cell = document.getElementById('cell' + x + '-' + y);

    if (!cell) {
        return;
    }

    if (state === 'hit') {
        cell.classList.add('hit');
    } else if (state === 'miss') {
        cell.classList.add('miss');
    }
}

export { renderHeader, renderBoard, renderShipStatus, updateBoardCell };
