'use strict';
//Helping general functions

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
    //The maximum is exclusive and the minimum is inclusive
}

function DEVELOPERTOOL(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j];
            if (currCell.isMine && !currCell.isShown) {
                currCell.isMarked = true;
                gGame.markedCount++
                renderCell(i, j, FLAG)
            }
        }
    }
}