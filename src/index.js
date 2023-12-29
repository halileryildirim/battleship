import domLoader from "./dom";
import game from "./game";

const domFuncs = domLoader();
const gameFuncs = game();

domFuncs.drawBoard();
gameFuncs.startGame();
