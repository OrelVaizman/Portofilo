'use strict';
var popSound = new Audio('sounds/collect.mp3');
var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';

var GAMER_IMG = '<img src="img/gamer.png">';
var BALL_IMG = '<img src="img/ball.png">';

var gGamerPos = { i: 2, j: 9 };
var gBoard = buildBoard();
var ballInterval = setInterval(function () {
	var pos = createRandomBall(gBoard);
	renderCell(pos, BALL_IMG);
}, 3000);
var gCreatedBalls = 2;
var gBallScore = 0;

function init() {

	gBallScore = 0
	gBoard = buildBoard();
	renderBoard(gBoard);
	ballInterval;
}
function buildBoard() {
	var board = [];
	// TODO: Create the Matrix 10 * 12 
	// TODO: Put FLOOR everywhere and WALL at edges
	var height = 10;
	var width = 12;

	for (var i = 0; i < height; i++) {
		board[i] = [];
		for (var j = 0; j < width; j++) {
			var cell = {
				type: FLOOR,
				gameElement: ''
			}
			if (i === 0 || j === 0 || i === height - 1 || j === width - 1) {
				cell.type = WALL;
			}
			board[i][j] = cell;
		}
	}
	// TODO: Place the gamer
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
	board[0][5].type = FLOOR;
	board[5][11].type = FLOOR;
	board[5][0].type = FLOOR;
	board[9][5].type = FLOOR;

	board[3][3].gameElement = BALL;
	board[4][5].gameElement = BALL;

	// console.log(board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	// console.log('strHTML is:');
	// console.log(strHTML);
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to ake sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	var absDistance = jAbsDiff + iAbsDiff;

	console.log('abs distance vetween cells:', absDistance);

	// If the clicked Cell is one of the four allowed
	if (absDistance === 1 || gGamerPos.i === 0 || gGamerPos.i === 9 || gGamerPos.j === 11 || gGamerPos.j === 0) {

		if (targetCell.gameElement === BALL) {
			var ballscoreDiv = document.querySelector('.ballscore');
			popSound.play();
			gBallScore++
			isVictory();

			ballscoreDiv.innerText = (gBallScore);
			// console.log('Collecting!');
			console.log('You\'ve collected:', gBallScore, 'balls.')

		}

		// Todo: Move the gamer
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = '';
		renderCell(gGamerPos, '');

		gGamerPos.i = i;
		gGamerPos.j = j;

		gBoard[i][j].gameElement = GAMER;
		renderCell(gGamerPos, GAMER_IMG);



	} else console.log('TOO FAR', iAbsDiff, jAbsDiff);
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	// console.log(elCell);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
// function handleKey(event) {

// 	// console.log(event);

// 	var i = gGamerPos.i;
// 	var j = gGamerPos.j;


// 	switch (event.key) {
// 		case 'ArrowLeft':
// 			moveTo(i, j - 1);
// 			break;
// 		case 'ArrowRight':
// 			moveTo(i, j + 1);
// 			break;
// 		case 'ArrowUp':
// 			moveTo(i - 1, j);
// 			break;
// 		case 'ArrowDown':
// 			moveTo(i + 1, j);
// 			break;
// 	}

// }
// Move the player by keyboard arrows
function handleKey(event) {
	var i = gGamerPos.i;
	var j = gGamerPos.j;
	switch (event.key) {
		case "ArrowLeft":
			if (gBoard[5][0].gameElement === GAMER) {
				moveTo(5, 11)
			} else {
				moveTo(i, j - 1);
			}
			break;
		case "ArrowRight":
			if (gBoard[5][11].gameElement === GAMER) {
				moveTo(5, 0);
			} else {
				moveTo(i, j + 1);
			}
			break;
		case "ArrowUp":
			if (gBoard[0][5].gameElement === GAMER) {
				moveTo(9, 5);
			} else {
				moveTo(i - 1, j);
			}
			break;
		case "ArrowDown":
			if (gBoard[9][5].gameElement === GAMER) {
				moveTo(0, 5);
			} else {
				moveTo(i + 1, j);
			}
			break;
	}
}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function createRandomBall(board) {
	var emptyCells = [];
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];
			if (currCell.type === FLOOR && currCell.gameElement === '') {
				emptyCells.push({ i, j });
			}
		}
	}
	var randomCell = emptyCells[getRandomInt(0, emptyCells.length)]
	board[randomCell.i][randomCell.j].gameElement = BALL;
	gCreatedBalls++
	// renderCell(randomCell, BALL_IMG);
	return randomCell;
	// console.log(randomCell);
}


function isVictory() {
	if (gBallScore === gCreatedBalls) {
		alert('You won!');
		var elBtn = document.querySelector('.restart')
		elBtn.style.display = 'block';
		clearInterval(1);
		// gBallScore = 0;
	}
}
function restartGame(elBtn) {
	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	elBtn.style.display = 'none';
	gCreatedBalls = 2;
	gBallScore = 0;
	var ballscoreDiv = document.querySelector('.ballscore');
	ballscoreDiv.innerText = (gBallScore);
	init();
}