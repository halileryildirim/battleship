/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction domLoader() {\n  function drawBoard() {\n    // draw board for player\n    const playerBoard = document.querySelector(\"#player-board\");\n    for (let i = 0; i < 10; i += 1) {\n      const playerRow = document.createElement(\"div\");\n      for (let j = 0; j < 10; j += 1) {\n        const cell = document.createElement(\"div\");\n        cell.classList.add(`(${i},${j})`);\n        playerRow.append(cell);\n      }\n      playerBoard.append(playerRow);\n    }\n\n    // draw board for computer\n    const computerBoard = document.querySelector(\"#computer-board\");\n    for (let i = 0; i < 10; i += 1) {\n      const computerRow = document.createElement(\"div\");\n      for (let j = 0; j < 10; j += 1) {\n        const cell = document.createElement(\"div\");\n        cell.classList.add(`(${i},${j})`);\n        computerRow.append(cell);\n      }\n      computerBoard.append(computerRow);\n    }\n  }\n  function updateBoard(x, y) {\n    const updateCell = document.querySelector(`(${x},${y})`);\n    if (updateCell.classList.contains(\"ship\")) {\n      updateCell.classList.add(\"ship-hit\");\n      updateCell.textContent = \"X\";\n    } else {\n      updateCell.classList.add(\"hit\");\n      updateCell.textContent = \"⚫\";\n    }\n  }\n  return {\n    drawBoard,\n    updateBoard\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domLoader);\n\n//# sourceURL=webpack://battleship/./src/dom.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\nfunction game() {\n  const playerZero = (0,_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  const playerBoard = playerZero.board;\n  const computer = (0,_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  const computerBoard = computer.board;\n  function startGame() {\n    playerZero.placeShipsRandom();\n    playerZero.setTurn(true);\n    computer.placeShipsRandom();\n    computer.setTurn(false);\n  }\n  function gameplay() {\n    while (playerZero.turn) {\n      // event listener for cells\n      // every cell click updates the cell with updateBoard from DOM.js and computer gameBoard receiveAttack\n      // if a valid click is confirmed playerZero.turn = false, computer.turn = true\n      // also append a message like your turn maybe?\n    }\n    while (computer.turn) {\n      // no need for cell listeners\n      // receive the attack info and updateBoard with DOM.js and player gameBoard receiveAttack\n      // if attack is valid computer.turn = false, playerZero.turn = true\n    }\n  }\n\n  /*\n    ????????????????????????????????????????????????????????????????????????????????????????????????\n    THE ACTUAL FUCKING PROBLEM IS HOW AM I GONNA LINK THE SHIP PLACES IN GAMEBOARD WITH DOM\n    ????????????????????????????????????????????????????????????????????????????????????????????????\n  */\n  return {\n    startGame,\n    gameplay\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (game);\n\n//# sourceURL=webpack://battleship/./src/game.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// import Ship from \"./ship\";\n\nfunction gameboard() {\n  const board = Array(10);\n  for (let i = 0; i < board.length; i += 1) {\n    const rows = Array(10);\n    board[i] = rows;\n  }\n  const ships = [];\n  function placeShip(_ref, ship) {\n    let [row, col] = _ref;\n    // vertical ship placement\n    const shipSize = ship.length;\n    if (ship.vertical) {\n      if (row + shipSize < 10 && board[row][col] !== \"S\") {\n        for (let i = 0; i < shipSize; i += 1) {\n          if (board[row + i][col] !== \"S\") board[row + i][col] = \"S\";else {\n            while (i >= 0) {\n              delete board[row + i - 1][col];\n              i -= 1;\n            }\n            return false;\n          }\n        }\n        ships.push(ship);\n        return true;\n      }\n      return false;\n    }\n\n    // horizontal ship placement\n    if (col + shipSize < 10 && board[row][col] !== \"S\") {\n      for (let i = 0; i < shipSize; i += 1) {\n        if (board[row][col + i] !== \"S\") board[row][col + i] = \"S\";else {\n          while (i > 0) {\n            delete board[row][col + i - 1];\n            i -= 1;\n          }\n          return false;\n        }\n      }\n      ships.push(ship);\n      return true;\n    }\n    return false;\n  }\n  function receiveAttack(x, y) {\n    // receive the attack , check if its hit first then if there's a ship or water update.\n    if (board[x][y] !== \"H\") {\n      if (board[x][y] === \"S\") {\n        // initiate ship hit when actual ships are used for ship placement ship.hit()\n        // After every successful attack check if they're sunk\n        // If a ship sinks filter ships from sunk ships end the game when ships are empty\n        board[x][y] = \"H\";\n        return true;\n      }\n      board[x][y] = \"H\";\n      return false;\n    }\n    return false;\n  }\n  return {\n    board,\n    ships,\n    placeShip,\n    receiveAttack\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameboard);\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nconst domFuncs = (0,_dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\nconst gameFuncs = (0,_game__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\ndomFuncs.drawBoard();\ngameFuncs.startGame();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\nfunction player() {\n  const board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  const turn = false;\n  const attacks = [];\n  function setTurn(value) {\n    this.turn = value;\n  }\n  function attack(x, y) {\n    if (x < 10 && y < 10 && !attacks.includes(`(${x},${y})`)) {\n      attacks.push(`(${x},${y})`);\n      return [x, y];\n    }\n    return \"Invalid Attack\";\n  }\n  function compAttack() {\n    let randomX = Math.floor(Math.random() * 10);\n    let randomY = Math.floor(Math.random() * 10);\n    while (attacks.includes(`(${randomX},${randomY})`)) {\n      randomX = Math.floor(Math.random() * 10);\n      randomY = Math.floor(Math.random() * 10);\n    }\n    attacks.push(`(${randomX},${randomY})`);\n    return [randomX, randomY];\n  }\n  function placeShipsRandom() {\n    const carrier = new _ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"](6);\n    const battleship = new _ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"](4);\n    const destroyer = new _ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"](3);\n    const submarine = new _ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"](3);\n    const cruiser = new _ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"](2);\n    if (board.ships.length !== 5) {\n      let randomX = Math.floor(Math.random() * 10);\n      let randomY = Math.floor(Math.random() * 10);\n      if (!board.placeShip([randomX, randomY], carrier)) {\n        while (!board.placeShip([randomX, randomY], carrier)) {\n          carrier.rotate();\n          randomX = Math.floor(Math.random() * 10);\n          randomY = Math.floor(Math.random() * 10);\n        }\n      }\n      if (!board.placeShip([randomX, randomY], battleship)) {\n        while (!board.placeShip([randomX, randomY], battleship)) {\n          battleship.rotate();\n          randomX = Math.floor(Math.random() * 10);\n          randomY = Math.floor(Math.random() * 10);\n        }\n      }\n      if (!board.placeShip([randomX, randomY], destroyer)) {\n        while (!board.placeShip([randomX, randomY], destroyer)) {\n          destroyer.rotate();\n          randomX = Math.floor(Math.random() * 10);\n          randomY = Math.floor(Math.random() * 10);\n        }\n      }\n      if (!board.placeShip([randomX, randomY], submarine)) {\n        while (!board.placeShip([randomX, randomY], submarine)) {\n          submarine.rotate();\n          randomX = Math.floor(Math.random() * 10);\n          randomY = Math.floor(Math.random() * 10);\n        }\n      }\n      if (!board.placeShip([randomX, randomY], cruiser)) {\n        while (!board.placeShip([randomX, randomY], cruiser)) {\n          cruiser.rotate();\n          randomX = Math.floor(Math.random() * 10);\n          randomY = Math.floor(Math.random() * 10);\n        }\n      }\n    }\n  }\n  return {\n    board,\n    turn,\n    attacks,\n    setTurn,\n    attack,\n    compAttack,\n    placeShipsRandom\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (player);\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Ship {\n  constructor(length) {\n    let hits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n    let vertical = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;\n    let sunk = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;\n    this.length = length;\n    this.hits = hits;\n    this.sunk = sunk;\n    this.vertical = vertical;\n  }\n  hit() {\n    this.hits += 1;\n  }\n  rotate() {\n    this.vertical === true ? this.vertical = false : this.vertical = true;\n  }\n  isSunk() {\n    if (this.hits === this.length) this.sunk = true;\n    return this.sunk;\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;