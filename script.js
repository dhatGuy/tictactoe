
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

        if (amountofX > amountofO) {
        e.target.textContent = 'O'
        board[e.target.id-1] = "O";
        amountofO++;
        
    }
        else {
            e.target.textContent = 'X'
            board[e.target.id-1] = "X";
            amountofX++;
            gameFlow.computerMove();
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

 

    let board = 
        [
            "", "", "",
            "", "", "",
            "", "", ""
        ]

    return {
        board,
        clickFunction,
        initializeGame
    }
})();

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
        for(let g=0; g<gameBoard.board.length;g++) {
            gameBoard.board[g] = "";
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
            if(gameBoard.board[g] === "") freeSpaces++;
        }

        let atFreeSpace = 0;

        let newMove = Math.ceil(Math.random()*freeSpaces);

        for(let e=0; e<gameBoard.board.length; e++) {
            if(gameBoard.board[e] === "") atFreeSpace++;
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