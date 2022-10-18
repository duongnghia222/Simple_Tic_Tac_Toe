
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const o = 'circle';
const x = 'x';
let circleTurn;
const win = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const winningMessageText =  document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');

restartButton.addEventListener('click', startGame);

startGame();

function startGame() {
    cellElements.forEach(cell => {
        cell.classList.remove(x);
        cell.classList.remove(o);
        
    })
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, {once:true})
    });
    setBoardHover();
    winningMessageElement.classList.remove('show');
}

function handleClick(event) {
    const cell = event.target;
    const current = circleTurn ? o : x;
    placeMark(cell, current);
    if (checkWin(current)){
        endGame(false);
    } else if(isDraw()){
        endGame(true);
    } else{
        swapTurn();
        setBoardHover();
    }
    
}

function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = `Draw !!!`;
    }  else {
        winningMessageText.innerText = `${circleTurn ? "O" : "X"} Wins !!!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(x) || cell.classList.contains(o)
    })
}

function placeMark(cell, current){
    cell.classList.add(current);
}

function swapTurn() {
    circleTurn = !circleTurn;
}

function setBoardHover() {
    board.classList.remove(x);
    board.classList.remove(o);
    if(circleTurn){
        board.classList.add(o);
    }
    else{
        board.classList.add(x);
    }
}

function checkWin(current) {
    return win.some(c => {
        return c.every(index => {
            return cellElements[index].classList.contains(current)
        })
    })
}