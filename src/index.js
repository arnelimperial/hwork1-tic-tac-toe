import "./styles.css";

var originalBoard, cells;

const player1 = 'O', player2 = 'X';

const winPattern = [
  [0,1,2,3,4],
  [5,6,7,8,9],
  [10,11,12,13,14],
  [15,16,17,18,19],
  [20,21,22,23,24],
  [0,5,10,15,20],
  [1,6,11,16,21],
  [2,7,12,17,22],
  [3,8,13,18,23],
  [4,9,14,19,24],
  [0,6,12,18,24],
  [4,8,12,16,20],
];

init();

document.querySelector('.restart').addEventListener('click', init);



function init() {
  
  cells = document.querySelectorAll('.cell');

  document.querySelector('.endgame').style.display = "none";
  document.querySelector('#board').style.display = "block";
  
  originalBoard = Array.from(Array(25).keys());

  for(let i=0;i < cells.length;i++) {
    cells[i].textContent = '';
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click', turnClick, false);
  }
}

// function turnClick(square) {
//   if (typeof originalBoard[square.target.id] === 'number') {
//     turn(square.target.id, player1);

//     if(!checkTie()) turn(bestSpot(), player2)
//   }
  
// }

function turnClick(square) {
	if (typeof originalBoard[square.target.id] === 'number') {
		turn(square.target.id, player1)
		if (!checkWin(originalBoard, player1) && !checkTie()) turn(bestSpot(), player2);
	}
}



function turn(squareId, player) {
  originalBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;

  let gameWon = checkWin(originalBoard, player);
  if(gameWon) gameOver(gameWon) 
}

function checkWin(board, player) {
  let plays = board.reduce((a,e,i) => 
    (e === player) ? a.concat(i) : a, []);

  let gameWon = null;
  for(let [index, win] of winPattern.entries()) {
    if(win.every(elem => plays.indexOf(elem) > -1)){
      gameWon = {index: index, player: player};
      break;
    }
  }
  return gameWon;

}

function gameOver(gameWon) {
  for (let index of winPattern[gameWon.index]) {
    document.getElementById(index).style.backgroundColor = 
    gameWon.player === player1 ? "green" : "blue";
    //gameWon.player == player1 ? alert("Player 1 won!") : alert("Player 2 won!");

	}
	
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
  }
  
  declareWinner(gameWon.player  === player1 ? "Player 1 won!" : "Player 2 won!");

}

function emptySquares() {
  return originalBoard.filter(s => typeof s === 'number')
}

function bestSpot() {
  return emptySquares()[0];
}


function declareWinner(who) {
  document.querySelector('.endgame').style.display = "block";
  document.querySelector('.endgame .text').textContent = who;

}

function checkTie() {
  if(emptySquares().length === 0) {
    for(let i=0; i < cells.length; i++){
      cells[i].style.backgroundColor = "yellow";
      cells[i].removeEventListener('click', turnClick, false);
    }
      declareWinner("It's a draw!");
      return true;
      
  }
  return false;
}


