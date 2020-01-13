
const gameBoard = (() => { 
    
    let binge = document.querySelectorAll("div > div > div");
    
  
    let clickFunction = function(e) {
        console.log(e)

        let amountofX = 0;
        let amountofO = 0;
        
        for(let g=0; g<board.length; g++) {
            if(board[g] === "X") amountofX++;
            else if(board[g] === "O") amountofO++;
        }

        console.log("amountofX " + amountofX);
        console.log("amountofO " + amountofO);


        if (amountofX > amountofO) {
        e.target.textContent = 'O'
        board[e.target.id-1] = "O";
        amountofO++;
        
    }
        else {
            e.target.textContent = 'X'
            board[e.target.id-1] = "X";
            amountofX++;
            if(player2.name === "Computer (easy)") {
                gameFlow.computerMove(); 
            }
            else if (player2.name === "Computer (unbeatable)") {
                if((amountofO + amountofX) <= 8) {
                let aiIndex = aiPlay();
                document.getElementById(`${aiIndex+1}`).textContent = "O";
                gameBoard.board[aiIndex] = "O";
                }
            }

        }
  if(amountofX === 5 && amountofO === 4) {
        gameFlow.checkWin("end");
  }
  else {
        gameFlow.checkWin();
  }

        }
    
function initializeGame() {
    for(let i = 0; i < binge.length; i++) {
        binge[i].addEventListener('click', clickFunction,{once: true});
    }     
};


 const playMode = () =>{
     let pvp = document.querySelector('[value=PVP]')
     let pvcEasy = document.querySelector('[value=PVC-easy]')
     let pvcUnbeat = document.querySelector('[value=PVC-unbeatable]')
     let players = document.querySelector('.player2')

     if(pvcEasy.checked){
        players.style.display = 'none';
        document.getElementById('player2').value="Computer (easy)";
     }

     else if(pvcUnbeat.checked) {
        players.style.display = 'none';
        document.getElementById('player2').value="Computer (unbeatable)";  
     }

     else if(pvp.checked) {
        document.getElementById('player2').value=""; 
        players.style.display = 'block';

     }

 };

 const startGame = () =>{
    document.querySelector('form')
     .addEventListener('submit', e => {
         gameFlow.setPlayers()
         e.preventDefault()
     })
 }





    let board = 
        [
            0, 1, 2,
            3, 4, 5,
            6, 7, 8
        ]

    return {
        board,
        clickFunction,
        initializeGame,
        playMode,
        startGame
    }
})();

gameBoard.startGame();


const Player = (name) => {
    let score = 0;
    return {
        name,
        score
    }
}

let player1;
let player2;


const gameFlow = (() => { 
    let binge = document.querySelectorAll("div > div > div");
    
    let checkWin = function(arg) {
        if((gameBoard.board[0] === "X" && gameBoard.board[1] === "X" && gameBoard.board[2] === "X") || 
        (gameBoard.board[3] === "X" && gameBoard.board[4] === "X" && gameBoard.board[5] === "X") ||
        (gameBoard.board[6] === "X" && gameBoard.board[7] === "X" && gameBoard.board[8] === "X") ||
        (gameBoard.board[0] === "X" && gameBoard.board[3] === "X" && gameBoard.board[6] === "X") ||
        (gameBoard.board[1] === "X" && gameBoard.board[4] === "X" && gameBoard.board[7] === "X") ||
        (gameBoard.board[2] === "X" && gameBoard.board[5] === "X" && gameBoard.board[8] === "X") ||
        (gameBoard.board[0] === "X" && gameBoard.board[4] === "X" && gameBoard.board[8] === "X") ||
        (gameBoard.board[2] === "X" && gameBoard.board[4] === "X" && gameBoard.board[6] === "X")) {
    
          
            for(let i = 0; i < binge.length; i++) {
                binge[i].removeEventListener('click', gameBoard.clickFunction);
                }
                ++player1.score;

                let scoreOverview = document.getElementById("score-overview");
                scoreOverview.innerHTML = `Current score: ${player1.score} : ${player2.score}`;
             
                let newGame = document.querySelector(".newGame");
                newGame.style.display = "block";

                alert(`${player1.name} won this round`);

        }
        
        
        else if((gameBoard.board[0] === "O" && gameBoard.board[1] === "O" && gameBoard.board[2] === "O") || 
        (gameBoard.board[3] === "O" && gameBoard.board[4] === "O" && gameBoard.board[5] === "O") ||
        (gameBoard.board[6] === "O" && gameBoard.board[7] === "O" && gameBoard.board[8] === "O") ||
        (gameBoard.board[0] === "O" && gameBoard.board[3] === "O" && gameBoard.board[6] === "O") ||
        (gameBoard.board[1] === "O" && gameBoard.board[4] === "O" && gameBoard.board[7] === "O") ||
        (gameBoard.board[2] === "O" && gameBoard.board[5] === "O" && gameBoard.board[8] === "O") ||
    (gameBoard.board[0] === "O" && gameBoard.board[4] === "O" && gameBoard.board[8] === "O") ||
    (gameBoard.board[2] === "O" && gameBoard.board[4] === "O" && gameBoard.board[6] === "O")) {
        
        
        for(let i = 0; i < binge.length; i++) {
            binge[i].removeEventListener('click', gameBoard.clickFunction);
            }
        
            ++player2.score;

            let scoreOverview = document.getElementById("score-overview");
                scoreOverview.innerHTML = `Current score: ${player1.score} : ${player2.score}`;
                
                let newGame = document.querySelector(".newGame");
                newGame.style.display = "block";

                alert(`${player2.name} won this round`);

    }

        else if (arg === "end") {
            let newGame = document.querySelector(".newGame");
                newGame.style.display = "block";
            alert("It's a tie!");
        }
        
}


    let newGame = function() { 
      //  gameBoard.board = [0,1,2,3,4,5,6,7,8];
        for(let g=0; g<gameBoard.board.length;g++) {
            gameBoard.board[g] = g;
            document.getElementById(`${g+1}`).textContent = "";
        }
        gameBoard.initializeGame();
        let x = document.querySelector(".newGame");
        x.style.display = "none";

    }

    function setPlayers() {
        player1 = Player(document.getElementById('player1').value);
        player2 = Player(document.getElementById('player2').value);
        gameBoard.initializeGame();
        let x = document.querySelector(".players");
        let y = document.querySelector(".startGame");
        let y2 = document.getElementById("playertype");
        y2.style.display = "none";
        x.style.display = "none";
        y.style.display = "none";
        let z = document.getElementById("player1-name");
        z.style.display = "block";
        z.innerHTML = `Player 1: ${player1.name}`
        let z2 = document.getElementById("player2-name");
        z2.style.display = "block";
        z2.innerHTML = `Player 2: ${player2.name}`
        let z3 = document.getElementById("score-overview");
        z3.style.display = "block";
        z3.innerHTML = `Current score: ${player1.score} : ${player2.score}`;
        
        }

    function computerMove() {
        
        let freeSpaces = 0;

        for(let g=0; g<gameBoard.board.length; g++) {
            if(gameBoard.board[g] !== "O" && gameBoard.board[g] !== "X") freeSpaces++;
        }

        let atFreeSpace = 0;

        let newMove = Math.ceil(Math.random()*freeSpaces);

        for(let e=0; e<gameBoard.board.length; e++) {
            if(gameBoard.board[e] !== "O" && gameBoard.board[e] !== "X") atFreeSpace++;
            if(atFreeSpace === newMove) {

                document.getElementById(`${e+1}`).textContent = "O";
                gameBoard.board[e] = "O";
                // amountofO++;

                console.log("test");
                return;

            }
            
        }
        console.log(newMove);
    }


    return {
        checkWin,
        newGame,
        setPlayers,
        computerMove
    }
})();


function aiPlay() {

    let origBoard = ["O",1,"X","X",4,"X",6,"O","O"];
    let aiPlayer = "O";
    let huPlayer = "X";

    // winning combinations using the board indexies for instace the first win could be 3 xes in a row
    function winning(board, player){
        if (
               (board[0] == player && board[1] == player && board[2] == player) ||
               (board[3] == player && board[4] == player && board[5] == player) ||
               (board[6] == player && board[7] == player && board[8] == player) ||
               (board[0] == player && board[3] == player && board[6] == player) ||
               (board[1] == player && board[4] == player && board[7] == player) ||
               (board[2] == player && board[5] == player && board[8] == player) ||
               (board[0] == player && board[4] == player && board[8] == player) ||
               (board[2] == player && board[4] == player && board[6] == player)
               ) {
               return true;
           } else {
               return false;
           }
       }

       // returns the available spots on the board
    function emptyIndexies(board){
    return  board.filter(s => s != "O" && s != "X");
  }


  // keep track of function calls
var fc = 0;

// finding the ultimate play on the game that favors the computer
var bestSpot = minimax(gameBoard.board, aiPlayer);

//logging the results
console.log("index: " + bestSpot.index);
console.log("function calls: " + fc);

// the main minimax function
function minimax(newBoard, player){
  
  //keep track of function calls;
  fc++;

  //available spots
  var availSpots = emptyIndexies(newBoard);

  // checks for the terminal states such as win, lose, and tie and returning a value accordingly
  if (winning(newBoard, huPlayer)){
     return {score:-10};
  }
	else if (winning(newBoard, aiPlayer)){
    return {score:10};
	}
  else if (availSpots.length === 0){
  	return {score:0};
  }

// an array to collect all the objects
  var moves = [];

  // loop through available spots
  for (var i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot that was stored as a number in the object's index key
    var move = {};
  	move.index = newBoard[availSpots[i]];

    // set the empty spot to the current player
    newBoard[availSpots[i]] = player;

    //if collect the score resulted from calling minimax on the opponent of the current player
    if (player == aiPlayer){
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    }
    else{
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    //reset the spot to empty
    newBoard[availSpots[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }

// if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if(player === aiPlayer){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
}

return bestSpot.index;


};

const startGame = () =>{
     document.querySelector('form')
     .addEventListener('submit', e => {
         gameFlow.setPlayers()
         e.preventDefault()
     })
 };
 startGame();