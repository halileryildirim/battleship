function domLoader() {
  function drawPlayerBoard(array) {
    const playerBoard = document.querySelector("#player-board");
    playerBoard.innerHTML = "";
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
    const computerBoard = document.querySelector("#computer-board");
    computerBoard.innerHTML = "";
    for (let i = 0; i < 10; i += 1) {
      const computerRow = document.createElement("div");
      computerRow.id = "computer-row";
      for (let j = 0; j < 10; j += 1) {
        const cell = document.createElement("div");
        cell.id = "cell";
        cell.dataset.x = j;
        cell.dataset.y = i;
        if (array[j][i] === "S") {
          cell.dataset.value = "ship";
        }
        computerRow.append(cell);
      }
      computerBoard.append(computerRow);
    }
  }

  function updateBoard(cell) {
    if (cell.dataset.value === "ship") {
      if (!cell.classList.contains("hit")) {
        cell.classList.add("hit");
        cell.innerText = "X";
      }
    } else {
      cell.classList.add("interacted");
      cell.innerText = "⚫";
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
          cell.innerText = "X";
        }
      } else {
        cell.classList.add("interacted");
        cell.innerText = "⚫";
      }
    }
  }

  return {
    drawPlayerBoard,
    drawCompBoard,
    updateBoard,
    updatePlayerBoard,
  };
}

export default domLoader;
