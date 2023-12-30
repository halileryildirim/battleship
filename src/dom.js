function domLoader() {
  function drawPlayerBoard(array) {
    // draw board for player
    const playerBoard = document.querySelector("#player-board");
    for (let i = 0; i < 10; i += 1) {
      const playerRow = document.createElement("div");
      playerRow.id = "player-row";
      for (let j = 0; j < 10; j += 1) {
        const cell = document.createElement("div");
        cell.classList.add(j);
        cell.classList.add(i);
        if (array[j][i] === "S") {
          cell.classList.add("ship");
        } else if (array[j][i] === "s") {
          cell.classList.add("ship-zone");
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
        cell.classList.add(j);
        cell.classList.add(i);
        if (array[j][i] === "S") {
          cell.classList.add("ship");
        } else if (array[j][i] === "s") {
          cell.classList.add("ship-zone");
        }
        computerRow.append(cell);
      }
      computerBoard.append(computerRow);
    }
  }

  function updateBoard(x, y, array, cell) {}
  return { drawPlayerBoard, drawCompBoard, updateBoard };
}

export default domLoader;
// ⚫
