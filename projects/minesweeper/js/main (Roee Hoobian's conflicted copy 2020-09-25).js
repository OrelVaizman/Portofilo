'use strict';

//Global variable that represents the board, it equals to a function which returns it
var gBoard;
const MINE = '💣';
const EMPTY = '';
const FLAG = "🚩";

// The following variable provides us the information regarding the Game's inner counters of the user's 
// actions (marked cells/ cells that already revealed, timestamp, and isOn)

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

//The following variable will provide us the level of the game (beginner, medium, expert - and mines count
// accordinly)

var gLevel = {
    SIZE: 4,
    MINES: 2
};

//On the load of the page, that function will load the global functions which will create us 
// the total result eventually.

function init() {
    gBoard = buildBoard();
    getRandomMines(gLevel.MINES)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard);
    gGame.isOn = true;
}


function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = {
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell;
        }
    }
    return board;
}

function renderBoard(board) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            // var className = `cell cell-${i}-${j}`;
            var idName = "cell-" + i + "-" + j;
            var content = EMPTY;
            if (cell.isShown && cell.isMine) {
                content = MINE;
            } else if (cell.isShown && cell.minesAroundCount > 0 && !cell.isMine) {
                content = cell.minesAroundCount;
            }

            strHTML += `<td class="cell" id="${idName}" onclick="cellClicked(this,${i},${j})" oncontxtmenu="cellMarked(this,${i},${j})"">${content}</td>`

        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    //closes tbody and table tags
    var elContainer = document.querySelector('.game-container');
    elContainer.innerHTML = strHTML;
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        // console.log(board[i])
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var count = countMinesAroundCell(board, { i, j });
            cell.minesAroundCount = count;
        }
    }
}


function countMinesAroundCell(board, pos) {
    var count = 0;
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === pos.i && j === pos.j) continue;

            if (board[i][j].isMine) count++;
        }
    }
    return count;
}

function cellClicked(elCell, i, j) {
    if (!gGame.isOn) return;
    elCell.style.backgroundColor = '#80CFA9';
    // console.log(i,j)
    // console.log(elCell);
    var cell = gBoard[i][j];
    var value = EMPTY;

    if (cell.isMine) {
        value = MINE;
    } else if (cell.minesAroundCount > 0 && !cell.isMine) {
        value = cell.minesAroundCount;
    }
    renderCell(i, j, value)
}

function renderCell(i, j, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`#cell-${i}-${j}`);
    elCell.innerText = value;
}

function cellMarked(elCell,i,j) {
    if (!gGame.isOn) return;
    var currCell = board[i][j];

}

function getAllPossibleCoords(board) {
    var allPossibleCoords = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            //TOBECHANGED: This if.
            if (!currCell.isMine) {
                allPossibleCoords.push({ i, j });
            }
        }
    }
    return allPossibleCoords;
}

function getRandomMines(MinesNum) {
    var possibleCoords = getAllPossibleCoords(gBoard).slice();
    for (var i = 0; i < MinesNum; i++) {
        var randomIDX = getRandomInt(0, possibleCoords.length)
        var randomCoord = possibleCoords[randomIDX];
        gBoard[randomCoord.i][randomCoord.j].isMine = true
        possibleCoords.splice(randomIDX, 1);
    }
}

function setDifficultyLevel(elBtn) {
    if (elBtn.innerText === 'Beginner') {
        gLevel = {
            SIZE: 4,
            MINES: 2
        };
        init();
    }
    else if (elBtn.innerText === 'Medium') {
        gLevel = {
            SIZE: 8,
            MINES: 12
        };
        init();
        // console.log('Medium')
    }
    else if (elBtn.innerText === 'Expert') {
        gLevel = {
            SIZE: 12,
            MINES: 30
        };
        init();
        // console.log('Expert')
    }
}

