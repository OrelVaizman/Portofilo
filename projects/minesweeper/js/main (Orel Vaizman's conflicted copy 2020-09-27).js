'use strict';

var gBoard;
const MINE = '💣';
const EMPTY = ''; /*Hiding the content*/
const FLAG = '🚩';
const LOSESMILEY = '😫';
const WINNINGSMILEY = '😝';
const SMILEY = '😃';
var gTimeInterval;


var gGame = {
    isOn: false,
    shownCount: 0, /*Every cell shown counter*/
    markedCount: 0, /*Every markedcell*/
    visibleMine: 0, //Mines that are visible when u still had lives
    secsPassed: 0,
}

/*Two more levels defined at setDifficultyLevel*/
var gLevel = {
    SIZE: 4,
    MINES: 2,
    LIVES: 1
};

/* Initializing the game */
function init() {
    clearInterval(gTimeInterval)
    gBoard = buildBoard();
    getRandomMines(gLevel.MINES)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard);
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        visibleMine: 0,
        secsPassed: 0,
    }
}


function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = {
                minesAroundCount: 0,
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
            var idName = "cell-" + i + "-" + j;
            var content = EMPTY;
            if (cell.isShown && cell.isMine) {
                content = MINE;
            } else if (cell.isShown && cell.minesAroundCount > 0 && !cell.isMine) {
                content = cell.minesAroundCount;
            }
            strHTML += `<td class="cell" id="${idName}" onclick="cellClicked(this,${i},${j})" oncontextmenu="cellMarked(this,${i},${j},event)">${content}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector('.game-container');
    elContainer.innerHTML = strHTML;
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
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
    var cell = gBoard[i][j]; //current cell
    if (cell.isMarked) return; // flagged
    if (cell.isShown) return; //visibie
    if (gGame.shownCount === 0) {
        gGame.isOn = true;
        gTimeInterval = setInterval(setTimer, 1000) //timer
        if (cell.isMine) {
            firstClickNeverAMine(gBoard, i, j);
        }
    }
    if (!gGame.isOn) return;
    cell.isShown = true;
    if (cell.minesAroundCount === 0 && !cell.isMine) {
        console.log('counter++', gGame.shownCount)
        // if (gGame.shownCount > 2) {
        expandShown(gBoard, i, j)
        gGame.shownCount++
    }
    elCell.style.backgroundColor = '#80CFA9';
    var value = EMPTY;
    var elLives = document.querySelector('.lives');
    var strHTML = `<img class="lives" src="imgs/lives.png">`
    if (cell.isMine) {
        value = MINE;
        gGame.shownCount++
        gGame.visibleMine++
        gLevel.LIVES--
        if (gLevel.LIVES === 2) {
            elLives.innerHTML = strHTML + strHTML;
        }
        else if (gLevel.LIVES === 1) {
            elLives.innerHTML = strHTML;
        }
        else if (gLevel.LIVES === 0) {
            elLives.innerHTML = '';
            blowGame(gBoard)
            console.log('TOBECHANGED: BLOWN GAME MESSAGE')
        }
    } else if (cell.minesAroundCount > 0 && !cell.isMine) {
        gGame.shownCount++
        console.log('counter++', gGame.shownCount)
        value = cell.minesAroundCount;
    }
    checkGameOver();
    renderCell(i, j, value)
}



function renderCell(i, j, value) {
    var elCell = document.querySelector(`#cell-${i}-${j}`);
    elCell.style.backgroundColor = '#80CFA9';
    elCell.innerText = value;
}

function cellMarked(elCell, i, j, rightClick) {
    rightClick.preventDefault() === false;
    var currCell = gBoard[i][j];
    if (!gGame.isOn) return;
    if (currCell.isShown) return;
    if (!currCell.isMarked) {
        currCell.isMarked = true;
        elCell.innerText = FLAG;
        gGame.markedCount++
    } else {
        currCell.isMarked = false;
        elCell.innerText = EMPTY;
        gGame.markedCount--
    }
    checkGameOver();
}



function getAllPossibleCoords(board) {
    var allPossibleCoords = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            if (!currCell.isMine) {
                allPossibleCoords.push({ i, j });
            }
        }
    }
    return allPossibleCoords;
}

function getRandomMines(numOfMines) {
    var possibleCoords = getAllPossibleCoords(gBoard).slice();
    for (var i = 0; i < numOfMines; i++) {
        var randomIDX = getRandomInt(0, possibleCoords.length)
        var randomCoord = possibleCoords[randomIDX];
        gBoard[randomCoord.i][randomCoord.j].isMine = true
        possibleCoords.splice(randomIDX, 1);
    }
}

function setDifficultyLevel(elBtn) {
    var elLives = document.querySelector('.lives');
    var strHTML = `<img class="lives" src="imgs/lives.png">`
    var elSmiley = document.querySelector('.smiley');
    if (elBtn.innerText === 'Beginner') {
        elLives.innerHTML = strHTML
        elSmiley.innerText = SMILEY;
        gLevel = {
            SIZE: 4,
            MINES: 2,
            LIVES: 1
        };
        init();
    }
    else if (elBtn.innerText === 'Medium') {
        elSmiley.innerText = SMILEY;
        elLives.innerHTML = strHTML + strHTML;
        gLevel = {
            SIZE: 8,
            MINES: 12,
            LIVES: 2
        };
        init();
    }
    else if (elBtn.innerText === 'Expert') {
        elSmiley.innerText = SMILEY;
        elLives.innerHTML = strHTML + strHTML + strHTML;
        gLevel = {
            SIZE: 12,
            MINES: 30,
            LIVES: 3
        };
        init();
    }
}

function setTimer() {
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    gGame.secsPassed++;
    secondsLabel.innerHTML = pad(gGame.secsPassed % 60);
    minutesLabel.innerHTML = pad(parseInt(gGame.secsPassed / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    }
    else {
        return valString;
    }
}


function expandShown(board, row, col) {
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === row && j === col) continue;
            var currCell = board[i][j];
            if (currCell.isShown) continue;
            currCell.isShown = true;
            var value = EMPTY;
            if (currCell.minesAroundCount > 0 && !currCell.isMine) {
                value = currCell.minesAroundCount;
            }
            gGame.shownCount++
            console.log('counter++', gGame.shownCount)
            renderCell(i, j, value)
        }
    }
}

function checkGameOver() {
    var elSmiley = document.querySelector('.smiley');
    if ((gGame.markedCount + gGame.visibleMine) === gLevel.MINES && (Math.pow(gLevel.SIZE, 2) - gLevel.MINES) === gGame.shownCount - gGame.visibleMine) {
        elSmiley.innerText = WINNINGSMILEY;
        alert('You won!');
        clearInterval(gTimeInterval)
    }
}

function blowGame(board) {
    var elSmiley = document.querySelector('.smiley');
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j];
            if (currCell.isMine) {
                currCell.isShown = true;
                renderCell(i, j, MINE)
            }
        }
    }
    clearInterval(gTimeInterval)
    elSmiley.innerText = LOSESMILEY;
    gGame.isOn = false;
}

function onSmiley(elSmiley) {
    clearInterval(gTimeInterval);
    elSmiley.innerText = WINNINGSMILEY;
    console.log('Initilaizing')
    setTimeout(function () {
        elSmiley.innerText = SMILEY;
    }, 100);
    init();
}

function firstClickNeverAMine(board, row, col) {
    var curCell = board[row][col];
    console.log('Getting into the function');
    var newMineCoords = getAllPossibleCoords(board);
    var newCoord = newMineCoords[getRandomInt(0, newMineCoords.length)]
    var newI = newCoord.i;
    var newJ = newCoord.j;
    curCell.isMine = false;
    board[newI][newJ].isMine = true;
    setMinesNegsCount(board);
    renderBoard(board)
}

