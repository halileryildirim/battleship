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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction domLoader() {\n  function drawPlayerBoard(array) {\n    // draw board for player\n    const playerBoard = document.querySelector(\"#player-board\");\n    for (let i = 0; i < 10; i += 1) {\n      const playerRow = document.createElement(\"div\");\n      playerRow.id = \"player-row\";\n      for (let j = 0; j < 10; j += 1) {\n        const cell = document.createElement(\"div\");\n        cell.id = \"cell\";\n        cell.dataset.x = i;\n        cell.dataset.y = j;\n        if (array[j][i] === \"S\") {\n          cell.classList.add(\"ship\");\n        }\n        playerRow.append(cell);\n      }\n      playerBoard.append(playerRow);\n    }\n  }\n  function drawCompBoard(array) {\n    // draw board for computer\n    const computerBoard = document.querySelector(\"#computer-board\");\n    for (let i = 0; i < 10; i += 1) {\n      const computerRow = document.createElement(\"div\");\n      computerRow.id = \"computer-row\";\n      for (let j = 0; j < 10; j += 1) {\n        const cell = document.createElement(\"div\");\n        cell.id = \"cell\";\n        cell.dataset.x = j;\n        cell.dataset.y = i;\n        if (array[j][i] === \"S\") {\n          cell.classList.add(\"computer-ship\");\n        }\n        computerRow.append(cell);\n      }\n      computerBoard.append(computerRow);\n    }\n  }\n  function updateBoard(cell) {\n    if (cell.classList.contains(\"ship\") || cell.classList.contains(\"computer-ship\")) {\n      if (!cell.classList.contains(\"hit\")) {\n        cell.classList.add(\"hit\");\n      }\n    } else {\n      // Mark as interacted for a miss (assuming no ship in this cell)\n      cell.classList.add(\"interacted\");\n    }\n  }\n  function updatePlayerBoard(x, y) {\n    const xValue = x;\n    const yValue = y;\n    const cell = document.querySelector(`[data-x=\"${xValue}\"][data-y=\"${yValue}\"]`);\n    const board = cell.parentNode;\n    if (board.id === \"player-row\") {\n      if (cell.classList.contains(\"ship\")) {\n        if (!cell.classList.contains(\"hit\")) {\n          cell.classList.add(\"hit\");\n        }\n      } else {\n        // Mark as interacted for a miss (assuming no ship in this cell)\n        cell.classList.add(\"interacted\");\n      }\n    }\n  }\n  return {\n    drawPlayerBoard,\n    drawCompBoard,\n    updateBoard,\n    updatePlayerBoard\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domLoader);\n\n//# sourceURL=webpack://battleship/./src/dom.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\n\nconst domManage = (0,_dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\nfunction game() {\n  const playerZero = (0,_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  const playerBoard = playerZero.board;\n  const playerZeroBoard = document.querySelectorAll(\"#player-board\");\n  const computer = (0,_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  const computerBoard = computer.board;\n  const compBoard = document.querySelectorAll(\"#computer-board\");\n  function startGame() {\n    playerBoard.placeShip([0, 0], new _ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](6, \"carrier\", false));\n    playerBoard.placeShip([2, 6], new _ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](4, \"battleship\", true));\n    playerBoard.placeShip([4, 0], new _ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](3, \"destroyer\", false));\n    playerBoard.placeShip([6, 8], new _ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](3, \"submarine\", true));\n    playerBoard.placeShip([7, 2], new _ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](2, \"cruiser\", false));\n    domManage.drawPlayerBoard(playerBoard.board);\n    computer.placeShipsRandom(); // computer gets its ships randomized\n    domManage.drawCompBoard(computerBoard.board);\n    playerZero.setTurn(true);\n  }\n  function gameplay() {\n    if (playerZero.turn) {\n      for (const cell of compBoard) {\n        if (!cell.classList.contains(\"hit\") && !cell.classList.contains(\"interacted\")) {\n          cell.addEventListener(\"click\", e => {\n            console.log(computerBoard.board);\n            const x = e.target.dataset.x;\n            const y = e.target.dataset.y;\n            computerBoard.receiveAttack(x, y);\n            domManage.updateBoard(e.target);\n            playerZero.setTurn(false);\n\n            // computer attacks randomly after player attacks\n            const attack = computer.compAttack();\n            playerBoard.receiveAttack(attack[0], attack[1]);\n            domManage.updatePlayerBoard(attack[0], attack[1]);\n            playerZero.setTurn(true);\n          });\n        }\n      }\n    }\n  }\n  return {\n    startGame,\n    gameplay,\n    playerZero,\n    computer\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (game);\n\n//# sourceURL=webpack://battleship/./src/game.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// import Ship from \"./ship\";\n\nfunction gameboard() {\n  const board = Array(10);\n  for (let i = 0; i < board.length; i += 1) {\n    const rows = [\" \", \" \", \" \", \" \", \" \", \" \", \" \", \" \", \" \", \" \"];\n    board[i] = rows;\n  }\n  const ships = [];\n  function placeShip(_ref, ship) {\n    let [row, col] = _ref;\n    const shipSize = ship.length;\n    if (ship.vertical) {\n      if (row + shipSize > 10) {\n        return false;\n      }\n      for (let i = row; i < row + shipSize; i += 1) {\n        if (board[i][col] === \"S\") {\n          return false;\n        }\n      }\n      for (let i = row; i < row + shipSize; i += 1) {\n        board[i][col] = \"S\";\n      }\n      ships.push(ship);\n      return true;\n    }\n    if (col + shipSize > 10) {\n      return false;\n    }\n    for (let i = col; i < col + shipSize; i += 1) {\n      if (board[row][i] === \"S\") {\n        return false;\n      }\n    }\n    for (let i = col; i < col + shipSize; i += 1) {\n      board[row][i] = \"S\";\n    }\n    ships.push(ship);\n    return true;\n  }\n  function receiveAttack(x, y) {\n    board[x][y] = \"H\";\n  }\n  return {\n    board,\n    ships,\n    placeShip,\n    receiveAttack\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameboard);\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nconst gameFuncs = (0,_game__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\ngameFuncs.startGame();\ngameFuncs.gameplay();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n\n\nfunction player() {\n  const board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  const turn = false;\n  const attacks = [];\n  function setTurn(value) {\n    this.turn = value;\n  }\n  function attack(x, y) {\n    if (x < 10 && y < 10 && !attacks.includes(`(${x},${y})`)) {\n      const playerAttack = `(${x},${y})`;\n      attacks.push(playerAttack);\n      return playerAttack;\n    }\n    return \"Invalid Attack\";\n  }\n  function compAttack() {\n    let randomX = Math.floor(Math.random() * 10);\n    let randomY = Math.floor(Math.random() * 10);\n    while (attacks.includes(`(${randomX},${randomY})`)) {\n      randomX = Math.floor(Math.random() * 10);\n      randomY = Math.floor(Math.random() * 10);\n    }\n    attacks.push(`(${randomX},${randomY})`);\n    return [randomX, randomY];\n  }\n  function placeShipsRandom() {\n    const shipsToPlace = [new _ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"](6, \"carrier\", true), new _ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"](4, \"battleship\", true), new _ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"](3, \"destroyer\", true), new _ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"](3, \"submarine\", true), new _ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"](2, \"cruiser\", true)];\n    for (const ship of shipsToPlace) {\n      let placed = false;\n      while (!placed) {\n        const randomX = Math.floor(Math.random() * 10);\n        const randomY = Math.floor(Math.random() * 10);\n        const orientation = Math.random() < 0.5;\n        ship.vertical = orientation;\n        if (board.placeShip([randomX, randomY], ship)) {\n          placed = true;\n        } else {\n          ship.rotate();\n        }\n      }\n    }\n  }\n  return {\n    board,\n    turn,\n    attacks,\n    setTurn,\n    attack,\n    compAttack,\n    placeShipsRandom\n  };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (player);\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Ship {\n  constructor(length, name, vertical) {\n    let hits = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;\n    let sunk = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;\n    this.length = length;\n    this.hits = hits;\n    this.sunk = sunk;\n    this.vertical = vertical;\n    this.name = name;\n  }\n  hit() {\n    this.hits += 1;\n  }\n  rotate() {\n    this.vertical === true ? this.vertical = false : this.vertical = true;\n  }\n  isSunk() {\n    if (this.hits === this.length) this.sunk = true;\n    return this.sunk;\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

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