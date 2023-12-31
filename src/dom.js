function domLoader() {
  function drawPlayerBoard(array) {
    // draw board for player
    const playerBoard = document.querySelector("#player-board");
    for (let i = 0; i < 10; i += 1) {
      const playerRow = document.createElement("div");
      playerRow.id = "player-row";
      for (let j = 0; j < 10; j += 1) {
        const cell = document.createElement("div");
        cell.id = "cell";
        cell.dataset.x = i;
        cell.dataset.y = j;
        if (array[j][i] === "S") {
          cell.classList.add("ship");
        }
        playerRow.append(cell);
      }
      playerBoard.append(playerRow);
    }
  }
  function drawCompBoard(array) {
    // draw board for computer
    const computerBoard = document.querySelector("#computer-board");
    for (let i = 0; i < 10; i += 1) {
      const computerRow = document.createElement("div");
      computerRow.id = "computer-row";
      for (let j = 0; j < 10; j += 1) {
        const cell = document.createElement("div");
        cell.id = "cell";
        cell.dataset.x = j;
        cell.dataset.y = i;
        if (array[j][i] === "S") {
          cell.classList.add("computer-ship");
        }
        computerRow.append(cell);
      }
      computerBoard.append(computerRow);
    }
  }

  function updateBoard(cell) {
    if (
      cell.classList.contains("ship") ||
      cell.classList.contains("computer-ship")
    ) {
      if (!cell.classList.contains("hit")) {
        cell.classList.add("hit");
      }
    } else {
      // Mark as interacted for a miss (assuming no ship in this cell)
      cell.classList.add("interacted");
    }
  }

  function updatePlayerBoard(x, y) {
    const xValue = x;
    const yValue = y;
    const cell = document.querySelector(
      `[data-x="${xValue}"][data-y="${yValue}"]`
    );
    const board = cell.parentNode;
    if (board.id === "player-row") {
      if (cell.classList.contains("ship")) {
        if (!cell.classList.contains("hit")) {
          cell.classList.add("hit");
        }
      } else {
        // Mark as interacted for a miss (assuming no ship in this cell)
        cell.classList.add("interacted");
      }
    }
  }

  return { drawPlayerBoard, drawCompBoard, updateBoard, updatePlayerBoard };
}

export default domLoader;
