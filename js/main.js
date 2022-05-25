'use strict'

var gBoard;
var SIZE = 4;

function initGame(){
    gBoard = buildBoard(SIZE,6);
    check4Neg()
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
            strHtml += `<td class="${tdId}" onclick="cellClicked(this)">${setMinesNegsCount(i,j)}
            </td>`
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-Borad');
    elMat.innerHTML = strHtml;
    console.log(strHtml)
}

function cellClicked(elCell) {
    var cellPos = getCellLoacation(elCell)
    console.log(cellPos)
    elCell = setMinesNegsCount(cellPos[0],cellPos[1])
    if(!gBoard[cellPos[0]][cellPos[1]].isShown){gBoard[cellPos[0]][cellPos[1]].isShown = true}

}

function setMinesNegsCount(rowIdx,collIdx){
    var cellInCheck = gBoard[rowIdx][collIdx]
    var negCount = 0
    if(rowIdx - 1 >= 0){if(gBoard[rowIdx - 1][collIdx].isMine)negCount++ } // to the top
    if(rowIdx + 1 < gBoard[0].length){if(gBoard[rowIdx + 1][collIdx].isMine)negCount++}
    if(collIdx - 1 >= 0){if(gBoard[rowIdx][collIdx - 1].isMine)negCount++}
    if(collIdx + 1 < gBoard[0].length){if(gBoard[rowIdx][collIdx + 1].isMine)negCount++}
    if(rowIdx - 1 >= 0 && collIdx - 1 >= 0){if(gBoard[rowIdx - 1][collIdx - 1].isMine)negCount++}
    if(rowIdx + 1 < gBoard[0].length && collIdx - 1 >= 0){if(gBoard[rowIdx + 1][collIdx - 1].isMine)negCount++}
    if(collIdx + 1 < gBoard[0].length && rowIdx - 1 >= 0){if(gBoard[rowIdx - 1][collIdx + 1].isMine)negCount++}
    if(collIdx + 1 < gBoard[0].length && rowIdx + 1 < gBoard[0].length){if(gBoard[rowIdx + 1][collIdx + 1].isMine)negCount++}

    cellInCheck.minesAroundCount = negCount
    // console.log(negCount)
    return negCount




}

function getCellLoacation(elCell){
    var celllocation = elCell.classList[0].split('-')
    celllocation.shift();
    var cellrow = +celllocation[0]
    var cellcol = +celllocation[1]
    var cellPos = [cellrow,cellcol]
    return cellPos

}


function flagCell(elCell){
    if (!elCell.classList.contains('mark')){
        elCell.classList.add('mark')
        console.log(elCell.classList)
        } else {elCell.classList.remove('mark')
    console.log(elCell.classList)
    }
}


function check4Neg(){
    for(var i = 0; i < SIZE; i++){
        for( var j = 0; j < SIZE; j++){
            setMinesNegsCount(i,j)
        }
    }
}