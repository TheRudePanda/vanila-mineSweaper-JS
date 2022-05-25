'use strict'

var gBoard;

function initGame(){
    gBoard = buildBoard();
    renderBoard(gBoard)
}
function restartGame(){
    gBoard = buildBoard();
    renderBoard(gBoard)

}
function buildBoard(size = 4, mines = 2) {
    var board = [];
    var mineLocations = [];
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            }


        }
    }
    for (var d = 0; d < mines;d++){
        var colNum = getRandomInt(size)
        var rowNum = getRandomInt(size)
        if(!board[colNum][rowNum].isMine){board[colNum][rowNum].isMine = true}
        else {d--}

    }
    console.log(mineLocations)


    console.table(board);
    return board;

}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < board.length; j++) {
            var tdId = `cell-${i}-${j}`;
            strHtml += `<td class="${tdId}" onclick="cellClicked(this)">
            </td>`
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-Borad');
    elMat.innerHTML = strHtml;
    console.log(strHtml)
}

function cellClicked(elCell) {
    if (!elCell.classList.contains('mark')){
        elCell.classList.add('mark')
        console.log(elCell.classList)
    } else {elCell.classList.remove('mark')
    console.log(elCell.classList)
    }
}

function setMinesNegsCount(board){

}