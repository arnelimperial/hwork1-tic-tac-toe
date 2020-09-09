var boardArr = [
  1,2,3,4,5,6,7,8,9,10,11,12,13,14,
  15,16,17,18,19,20,21,22,23,24,25
];

var newArr = [], cells;

var player1 = "O";
var player2 = "X";
cells = Array.from(document.querySelectorAll(".cell"));
var currentPlayer = player1;
var winner = "";


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

document.querySelector('#board').style.display = "block";

document.getElementById('game').addEventListener('click', startClick);

function startClick() {

  let randomChoice = Math.floor(Math.random() * boardArr.length);
  let selected = boardArr[randomChoice];
  let index = boardArr.indexOf(selected);

  if (index > -1) {
  boardArr.splice(index, 1);
  }
  newArr.push(selected);
  
  try{
    if (currentPlayer === player1) {
      document.getElementById(selected).innerHTML = player1;
      currentPlayer = player2;
    }else{
      document.getElementById(selected).innerHTML = player2;
      currentPlayer = player1;
    }
    checkWinner(winPattern, currentPlayer);
  }catch(err){
    alert("Draw!");
  }
}


function checkWinner(arr, curPlayer){
arr.forEach(function(subArr){
  var counter = 0;
  subArr.forEach(function(elem){
    if(cells[elem].innerHTML === curPlayer){
      counter++;
      if(counter == 5 ){
          winner = curPlayer;
          winner == 'O' ? alert('Player 1 won!') : alert('Player 2 won!');
      }
    }
  });
});
}








