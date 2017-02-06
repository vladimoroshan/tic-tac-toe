var message = document.getElementById('message'),
    square = document.querySelectorAll("li"), //for set function
    scoreX = document.getElementById('scoreX'), //for keeping track 
    scoreO = document.getElementById('scoreO'),
    winX = 0,
    winO = 0;

var difficult = '2', //default on AI 
    state = [0,0,0,0,0,0,0,0,0],
    game = true,
    last = "x"; //for two players

var HUMAN = false,
    COMPUTER = true,
    HUMVAL = -10, //values for minimax algoritm
    COMVAL = 10;

var winMatrix= [[0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6]];

function reset() { 
  message.innerHTML = "Start game"; 
  document.getElementById("crossWin").style.display = "none"; 
  document.getElementById("noughtWin").style.display = "none"; 
  document.getElementById("tie").style.display = "none"; 
  document.getElementById("board").style.display = "block"; 

    for(var i = 0; i <= 9; i++) {       
      square[i].innerHTML = "";
      state[i] = 0;
    }   

  game = true;
}

function set(index, player, id) { //make all changes on UI
    if(player !== true) {
        document.getElementById(id).style.color = '#545454'; //color X brown
        square[index].innerHTML = "&#x02A2F;"; //array of li tags, where set x
        document.getElementById("cross").style.borderBottom = "none"; // delete previous border
        document.getElementById("nought").style.borderBottom = "solid #14bdac"; //set O border
        message.innerHTML = "&#x02A2F; Turn"; //update text above board
        state[index] = HUMVAL; //this needs for AI, checkWin, checkFull
    }
    else {
      if(id) { //if two players
        document.getElementById(id).style.color = 'white';
      }
        square[index].innerHTML = "&bigcirc;"; // all the same, read above
        document.getElementById("nought").style.borderBottom = "none";
        document.getElementById("cross").style.borderBottom = "solid #14bdac";
        message.innerHTML = "&bigcirc; Turn";
        state[index] = COMVAL;
    }
     
   if(checkWin(state, player)) {    
      message.innerHTML = "Game Over";
      document.getElementById("board").style.display = "none"; //remove game grid
     
      if(player) { //pick right X or O winning div
        document.getElementById("noughtWin").style.display = "block";
        scoreO.innerHTML = winO + 1; 
      }
      else {
        document.getElementById("crossWin").style.display = "block";
        scoreX.innerHTML = winX + 1;    
      }      
      game = false;
    }

    if(checkFull(state)) { // check on draw
      message.innerHTML = "Game Over";
      document.getElementById("board").style.display = "none";
      document.getElementById("tie").style.display = "block";
    }  
}

function checkWin(board, player) {
  var value = player === HUMAN ? HUMVAL : COMVAL;

  for(var i = 0; i < 8; i++) {
    var win = true;
    
    for(var j = 0; j < 3; j++) {
      if(board[winMatrix[i][j]] !== value) {
        win = false; 
        break;
      }
    }

    if(win) {           
      return true;    
    }
  }
  return false;
}

function checkFull(board) {
  for(var i = 0; i < 9; i++) {
      if(board[i] === 0)
       return false;
      }    
  return true;
}

function blindMove(board) { // easy level
  var newMove = []; //array of empty boxes
    for(var i = 0; i < 9; i++) {
      if(board[i] === 0) 
      newMove.push(i)
    }  //just random move
  set(newMove[Math.floor(Math.random() * newMove.length)], COMPUTER);
}

function random() {
   return Math.floor(Math.random() * 11); //for novice move(medium);
}

function aiTurn(board, depth, player) { //for master move, unbeatable
  
  if(checkWin(board, !player))  
    return -10 + depth;
  
  if(checkFull(board)) 
    return 0;
  
  var value = player == HUMAN ? HUMVAL : COMVAL;
  
  var max = -Infinity;  
  var index = 0;
  
  for(var i = 0; i < 9; i++) {    
    
    if(board[i] === 0) {
        var newboard=board.slice();
        newboard[i]=value;
      
      var moveval= -aiTurn(newboard,depth + 1, !player);
      
      if(moveval > max) {
        max = moveval;
        index = i;
      }
    }
  }
  if(depth === 0)
   set(index, COMPUTER);

return max;
}

function turn() {  //for two players
   if(last === "x") last = "o";
   else last = "x";
 return last;
}

document.body.addEventListener("click", function(e) {  
   if (e.target.tagName === 'SELECT') {     
     difficult = e.target.value; 
   } 
  
  if (e.target.tagName === 'LI') {    
      if(e.target.innerHTML === "") { //if empty position
        if(game) { 
          setTimeout(function() {          
            set(e.target.value, HUMAN, e.target.id); //after 0.6sec set "X" or "O" on the board
            
            if(difficult == '0') {           
              blindMove(state);           
            }

            else if(difficult == '1') {
              if(random() < 5) aiTurn(state, 0, COMPUTER); // half of the time random move
              else blindMove(state); 
            }          

            else if(difficult == '2') {
              aiTurn(state, 0, COMPUTER);   
            }

            else if(difficult == '3') { 
              set(e.target.value, turn() === "o" ? HUMAN : COMPUTER, e.target.id);  //for two players 
            } 
          }, 600);                     
       }
    }
  } 
  
  if(e.target.id === "bottom") {
    reset();    
  }
  
}, false);
