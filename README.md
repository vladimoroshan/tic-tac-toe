#Building a Tic-Tac-Toe ("Noughts and Crosses") game with Javascript

What it is look like? See [here] (http://codepen.io/Moroshan/full/wgdxXm/)

##What is this all about?

> Tic-tac-toe (also known as noughts and crosses or Xs and Os) is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game. Players soon discover that best play from both parties leads to a draw. Hence, Tic-tac-toe is most often played by young children.

As always I started with a layout of my game. And I stuck! In this case, the most important are the logic of future project. But I like when my apps look good. So I gazed as others finished similar projects. I didn't like any. Maybe some of them simple and fairly well, but not enough. I typed the phrase "tic tac toe" in a google search. I liked what I saw. I know what it's called plagiarism, I hope Google does not mind.

Most of my applications are responsive. This project has a static design. It could be done for mobile phones (with double amount of code). But it is not necessary. Mostly, I focused on the logic of my game.

First of all, I made a tic tac toe game for two players, it was a piece of cake. My goal is to create a "thinking" game, even if it makes a random choice it is count. I heard about minimax algorithm. I wanted to make an unbeatable tic tac toe. It wasn't so easy. I read every article. Like this. Most of them have a good explain of how minimax algorithm works. But implementation in javascript isn't so understandable. Accidentally I saw a video on YOUTUBE about minimax and concise implementation in javascript. I used it in my game. It works perfectly.

My game has 3 levels difficulty plus for two players. I didn't implement my knowledge of OOP. Only was used variables and functions. I have many global variables, but it is ok for a small application. Also, I didn't canvas, though it could be more like the google version. 

To be honest I am not really happy with this particular project. I spend hours just trying to find a similar font. Styling tags ```<select> <option >``` was quite challenging. Anyway, I had a good lesson of never be a copycat. It is much harder! I think better create something on your own, and implement good features of others.

##Here it is html of my humble game


```

<div id="wrap">   
<div id="image"></div>

  <div id="top"> 
   
    <div id="dropdown"> <label for="unittype">&blacktriangledown;</label>
      <select>
        <option value="0">Easy</option>
        <option value="1">Medium</option>
        <option value="2" selected>Impossible</option>
        <option value="3">Play against a friend</option>
      </select>
    </div>
    
      <div id="cross"><span class="cn">x</span><span class="count">-</span></div>
      <div id="nought"><span class="cn">o</span><span class="count">1</span></div>    
    <div id="message">Start game</div>
  </div>
  
 <div id="center">
    <ul id="board">
      <li id="one"   value="0"></li>
      <li id="two"   value="1"></li>
      <li id="three" value="2"></li>
      <li id="four"  value="3"></li>
      <li id="five"  value="4"></li>
      <li id="six"   value="5"></li>
      <li id="seven" value="6"></li>
      <li id="eigth" value="7"></li>
      <li id="ninen" value="8"></li>
    </ul>
   <div id="result"><div id="winner">x</div> WINNER!</div>
</div>
  
 <button id="bottom">
   RESTART GAME
 </button>
</div>  

<footer id="footer" > 
<a href="https://www.linkedin.com/in/vlad-moroshan-266229129?trk=nav_responsive_tab_profile" target="_blank"><em>Feedback</em></a>
</footer>

```

##Javascript code

Comments provides information

===

```javascript

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

```

I think it is good, but it would be better if I used canvas.
