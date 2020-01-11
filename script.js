
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

initializeGame();
 

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
    
            alert("Player 1 won!" );
    
            for(let i = 0; i < binge.length; i++) {
                binge[i].removeEventListener('click', gameBoard.clickFunction);
                }
            player1.score++;
        }
        
        
        else if((gameBoard.board[0] === "O" && gameBoard.board[1] === "O" && gameBoard.board[2] === "O") || 
        (gameBoard.board[3] === "O" && gameBoard.board[4] === "O" && gameBoard.board[5] === "O") ||
        (gameBoard.board[6] === "O" && gameBoard.board[7] === "O" && gameBoard.board[8] === "O") ||
        (gameBoard.board[0] === "O" && gameBoard.board[3] === "O" && gameBoard.board[6] === "O") ||
        (gameBoard.board[1] === "O" && gameBoard.board[4] === "O" && gameBoard.board[7] === "O") ||
        (gameBoard.board[2] === "O" && gameBoard.board[5] === "O" && gameBoard.board[8] === "O") ||
    (gameBoard.board[0] === "O" && gameBoard.board[4] === "O" && gameBoard.board[8] === "O") ||
    (gameBoard.board[2] === "O" && gameBoard.board[4] === "O" && gameBoard.board[6] === "O")) {
        alert("Player 2 won!");
   
        for(let i = 0; i < binge.length; i++) {
            binge[i].removeEventListener('click', gameBoard.clickFunction);
            }
        player2.score++;
    }

        else if (arg === "end") {
            alert("It's a tie!");
        }
        
}


    let newGame = function() { 
        for(let g=0; g<gameBoard.board.length;g++) {
            gameBoard.board[g] = "";
            document.getElementById(`${g+1}`).textContent = "";
        }
        gameBoard.initializeGame();

    }

    function setPlayers() {
        player1 = Player(document.getElementById('player1').value);
        player2 = Player(document.getElementById('player2').value);
        
        }

    return {
        checkWin,
        newGame,
        setPlayers
    }
})();