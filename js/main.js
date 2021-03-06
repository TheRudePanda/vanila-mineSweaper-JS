'use strict'

var gBoard;
var gSize = 4;
var gMines = 2;
var gElapsedTime = 0;
var gIstimer = false ;


function initGame(){
    gBoard = buildBoard(gSize,gMines)
    check4Neg()
    renderBoard(gBoard)
}
function restartGame(){
    startGame()
    initGame()
    var lostMsg = document.querySelector('.loss')
    lostMsg.style.display = 'none'
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

    return board;

}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < board.length; j++) {
            var tdId = `cell-${i}-${j}`;
            var currCell = gBoard[i][j]
            var isMine = currCell.isMine
            var inCell = ''
            if(currCell.isMine){inCell = '<img class="imgs" src="img/bomb.png">'}
            else{inCell = setMinesNegsCount(i,j)}
            strHtml += `<td class="${tdId}"
            onclick="cellClicked(this)"
            onmousedown="flagCell(this)" >${inCell}
            </td>`
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-Borad');
    elMat.innerHTML = strHtml;
}

function cellClicked(elCell) {
    var cellPos = getCellLoacation(elCell)
    var currCell = gBoard[cellPos[0]][cellPos[1]]
    console.log(cellPos)
    console.log(currCell)
    if(currCell.isMine){lost()}
    if(!currCell.isMine){elCell.style.color = 'black'}
    console.log(cellPos[0],cellPos[1])
    if(!currCell.isShown){currCell.isShown = true}
    

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
    for(var i = 0; i < gSize; i++){
        for( var j = 0; j < gSize; j++){
            setMinesNegsCount(i,j)
        }
    }
}


function changeDifficutly(size, mines){
    gSize = size
    gMines = mines
    gBoard = buildBoard(gSize,gMines)
    check4Neg()
    renderBoard(gBoard)


}

function startGame(){
    var timer = document.querySelector('.timer')
    gIstimer = false
    console.log(gIstimer)
    clearInterval(gElapsedTime)

}

function setTimer() {
    var timer = document.querySelector('.timer')
    if(!gIstimer){
        var elapsedTime = 0
        gElapsedTime = setInterval(function(){
              elapsedTime += 1;
              timer.innerText = elapsedTime
            //   console.log(elapsedTime)
              gIstimer = true
            }, 1000);
        }
  }

function lost(){
    var lostMsg = document.querySelector('.loss')
    lostMsg.style.display = 'block'
    console.log(lostMsg)
    var bombImg = document.querySelector('.imgs')
    bombImg.style.display = 'block'
}

