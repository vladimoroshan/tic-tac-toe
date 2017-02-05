#Building a Tic-Tac-Toe ("Noughts and Crosses") game with Javascript

What it is look like? See [here] (http://codepen.io/Moroshan/full/wgdxXm/)

##What is this all about?

> Tic-tac-toe (also known as noughts and crosses or Xs and Os) is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game. Players soon discover that best play from both parties leads to a draw. Hence, Tic-tac-toe is most often played by young children.

As always I started with a layout of my game. And I stuck! In this case, the most important are the logic of future project. But I like when my apps look good. So I gazed as others finished similar projects. I didn't like any. Maybe some of them simple and fairly well, but not enough. I typed the phrase "tic tac toe" in a google search. I liked what I saw. I know what it's called plagiarism, I hope Google does not mind.

Most of my applications are responsive. This project has a static design. It could be done for mobile phones (with double amount of code). But it is not necessary. Mostly, I focused on the logic of my game.

First of all, I made a tic tac toe game for two players, it was a piece of cake. My goal is to create a "thinking" game, even if it makes a random choice it is count. I heard about minimax algorithm. I wanted to make an unbeatable tic tac toe. It wasn't so easy. I read every article. Like this. Most of them have a good explain of how minimax algorithm works. But implementation in javascript isn't so understandable. Accidentally I saw a video on YOUTUBE about minimax and concise implementation in javascript. I used it in my game. It works perfectly.

My game has 3 levels difficulty plus for two players. I didn't implement my knowledge of OOP. Only was used variables and functions. I have many global variables, but it is ok for a small application. Also, I didn't canvas, though it could be more like the google version. 

To be honest I am not really happy with this particular project. I spend hours just trying to find a similar font. Styling tags <select> <option > was quite challenging. Anyway, I had a good lesson of never be a copycat. It is much harder! I think better create something on your own, and implement good features of others.

##Here it is html of my humble game
==

```html

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

