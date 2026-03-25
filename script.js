let boardState = ["","","","","","","","",""];
let current = "X";
let gameActive = true;
let mode = "";
let scores = {X:0, O:0};
let p1="", p2="";

const winPatterns = [
[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]
];

function startGame(selectedMode){
  mode = selectedMode;

  p1 = document.getElementById("p1").value || "Player 1";
  p2 = document.getElementById("p2").value || (mode==="ai"?"Computer":"Player 2");

  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");

  createBoard();
  updateStatus();
}

function createBoard(){
  const board = document.getElementById("board");
  board.innerHTML = "";

  boardState.forEach((_, i)=>{
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.onclick = ()=>handleClick(i);
    board.appendChild(cell);
  });
}

function handleClick(i){
  if(!gameActive || boardState[i] !== "") return;

  makeMove(i, current);

  if(mode==="ai" && current==="O" && gameActive){
    setTimeout(aiMove, 400);
  }
}

function makeMove(i, player){
  boardState[i] = player;
  document.getElementById("board").children[i].textContent = player;

  if(checkWin(player)){
    gameActive = false;
    highlight(player);
    scores[player]++;
    updateScore();
    document.getElementById("status").textContent = player + " Wins!";
    return;
  }

  if(!boardState.includes("")){
    gameActive = false;
    document.getElementById("status").textContent = "Draw!";
    return;
  }

  current = player === "X" ? "O" : "X";
  updateStatus();
}

function updateStatus(){
  let name = current==="X"?p1:p2;
  document.getElementById("status").textContent = name + "'s Turn ("+current+")";
}

function checkWin(player){
  return winPatterns.some(p=>p.every(i=>boardState[i]===player));
}

function highlight(player){
  winPatterns.forEach(p=>{
    if(p.every(i=>boardState[i]===player)){
      p.forEach(i=>{
        document.getElementById("board").children[i].classList.add("winner");
      });
    }
  });
}

/* AI (simple smart) */
function aiMove(){
  let empty = boardState.map((v,i)=>v===""?i:null).filter(v=>v!==null);
  let move = empty[Math.floor(Math.random()*empty.length)];
  makeMove(move,"O");
}

function restart(){
  boardState = ["","","","","","","","",""];
  current = "X";
  gameActive = true;
  createBoard();
  updateStatus();
}

function goHome(){
  location.reload();
}

function updateScore(){
  document.getElementById("scoreX").textContent = scores.X;
  document.getElementById("scoreO").textContent = scores.O;
}