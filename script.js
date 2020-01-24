
const gameBoard = (() => {

    let binge = document.querySelectorAll("div > div > div");


    let clickFunction = function (e) {
        // console.log(e)

        let amountofX = 0;
        let amountofO = 0;

        for (let g = 0; g < board.length; g++) {
            if (board[g] === "X") amountofX++;
            else if (board[g] === "O") amountofO++;
        }

        // console.log("amountofX " + amountofX);
        // console.log("amountofO " + amountofO);


        if (amountofX > amountofO) {
            e.target.textContent = 'O'
            board[e.target.id - 1] = "O";
            amountofO++;

        }
        else {
            e.target.textContent = 'X'
            board[e.target.id - 1] = "X";
            amountofX++;
            if (player2.name === "Computer (easy)") {
                gameFlow.computerMove();
            }
            else if (player2.name === "Computer (hard)") {
                if ((amountofO + amountofX) <= 8) {
                    let aiIndex = aiPlay();
                    document.getElementById(`${aiIndex + 1}`).textContent = "O";
                    document.getElementById(`${aiIndex + 1}`).removeEventListener('click', gameBoard.clickFunction);
                    gameBoard.board[aiIndex] = "O";
                }
            }

        }
        if (amountofX === 5 && amountofO === 4) {
            gameFlow.checkWin("end");
        }
        else {
            gameFlow.checkWin();
        }

    }

    function initializeGame() {
        for (let i = 0; i < binge.length; i++) {
            binge[i].addEventListener('click', clickFunction, { once: true });
        }
    };

    const startGame = () => {
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

    let checkWin = function (arg) {

        let playerMark = "X";

        let possibleWinningCombs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        let winningComb = possibleWinningCombs.find(c => {
            return gameBoard.board[c[0]] == playerMark && gameBoard.board[c[1]] == playerMark && gameBoard.board[c[2]] == playerMark
        });

    
            if (winningComb) {
                winningComb.forEach(e => {
                let y2 = document.getElementById(`${e + 1}`);
                y2.style.backgroundColor = "grey";
            })


            for (let i = 0; i < binge.length; i++) {
                binge[i].removeEventListener('click', gameBoard.clickFunction);
            }
            ++player1.score;

            let scoreOverview = document.getElementById("score-overview");
            scoreOverview.innerHTML = `Current score: ${player1.score} : ${player2.score}`;

            let newGame = document.querySelector(".newGame");
            newGame.style.display = "block";

            alert(`${player1.name} won this round`);

        }

        let computerMark = "O";

        let winningCombO = possibleWinningCombs.find(c => {
            return gameBoard.board[c[0]] == computerMark && gameBoard.board[c[1]] == computerMark && gameBoard.board[c[2]] == computerMark
        });


           if (winningCombO) {
            winningCombO.forEach(e => {
                let y2 = document.getElementById(`${e + 1}`);
                y2.style.backgroundColor = "grey";
            })

            for (let i = 0; i < binge.length; i++) {
                binge[i].removeEventListener('click', gameBoard.clickFunction);
            }

            ++player2.score;

            let scoreOverview = document.getElementById("score-overview");
            scoreOverview.innerHTML = `Current score: ${player1.score} : ${player2.score}`;

            let newGame = document.querySelector(".newGame");
            newGame.style.display = "block";

            alert(`${player2.name} won this round`);

        }

        else if (winningComb === undefined && arg === "end") {
            let newGame = document.querySelector(".newGame");
            newGame.style.display = "block";
            alert("It's a tie!");
        }

    }


    let newGame = function () {
        //  gameBoard.board = [0,1,2,3,4,5,6,7,8];
        for (let g = 0; g < gameBoard.board.length; g++) {
            gameBoard.board[g] = g;
            document.getElementById(`${g + 1}`).textContent = "";
            document.getElementById(`${g + 1}`).style.backgroundColor = "mediumturquoise";
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
        document.getElementById("scoreboard").style.display = "none";
        y2.style.display = "none";
        x.style.display = "none";
        y.style.display = "none";

        document.getElementById("score").style.display = "flex";
        let z = document.getElementById("player1-name");
        z.style.display = "block";
        z.innerHTML = `P1: ${player1.name}`
        let z2 = document.getElementById("player2-name");
        z2.style.display = "block";
        z2.innerHTML = `P2: ${player2.name}`
        let z3 = document.getElementById("score-overview");
        z3.style.display = "block";
        z3.innerHTML = `Current score: ${player1.score} : ${player2.score}`;

    }

    function computerMove() {

        let freeSpaces = 0;

        for (let g = 0; g < gameBoard.board.length; g++) {
            if (gameBoard.board[g] !== "O" && gameBoard.board[g] !== "X") freeSpaces++;
        }

        let atFreeSpace = 0;

        let newMove = Math.ceil(Math.random() * freeSpaces);

        for (let e = 0; e < gameBoard.board.length; e++) {
            if (gameBoard.board[e] !== "O" && gameBoard.board[e] !== "X") atFreeSpace++;
            if (atFreeSpace === newMove) {

                document.getElementById(`${e + 1}`).textContent = "O";
                gameBoard.board[e] = "O";
                document.getElementById(`${e + 1}`).removeEventListener('click', gameBoard.clickFunction);

                // amountofO++;

                // console.log("test");
                return;

            }

        }
        // console.log(newMove);
    }

    const startGame = () => {
        document.querySelector('form')
            .addEventListener('submit', e => {
                gameFlow.setPlayers()
                e.preventDefault()
                document.querySelector(".grid-container").style.display = "flex";
                document.querySelector(".reset").style.display = "block";
            })
    };
    startGame();



let playMode = () =>{
    let single = document.querySelector('.single')
    let multi = document.querySelector('.multi')
    let mode = document.querySelector('.play-mode')


    mode.addEventListener('click', e =>{
        if(e.target.className == 'single'){
            document.querySelector('#playertype').style.display = 'flex';
            document.querySelector('.play-mode').style.display = 'none';
            // document.querySelector('.pvp-label').style.display = 'none'
        } else {
            document.querySelector('form').style.display = 'block'
            document.querySelector('.play-mode').style.display = 'none'
        }
    })
}

let playComp = () =>{
    document.querySelector('#playertype').addEventListener('click', e => {
        if(e.target.id == 'pvc-easy'){
            document.querySelector('form').style.display = 'block';
            document.querySelector('.player2').style.display = "none";
            document.getElementById('playertype').style.display = "none";
            document.getElementById('player2').value="Computer (easy)";
            // document.querySelector('.grid-container').style.display = 'flex'
        } else {
            document.querySelector('form').style.display = 'block';
            document.querySelector('.player2').style.display = "none";
            document.getElementById('playertype').style.display = "none";
            document.getElementById('player2').value="Computer (hard)";
        }
    })
}

playMode();
playComp();


    return {
        checkWin,
        newGame,
        setPlayers,
        computerMove
    }
})();


function aiPlay() {

    // ATTENTION!
    // ATTENTION!
    // ATTENTION!
    // We have copy pasted the below code from a tutorial and only slightly 
    // modified it to work with our tictactoe game. 
    // ~nearmint

    let origBoard = ["O", 1, "X", "X", 4, "X", 6, "O", "O"];
    let aiPlayer = "O";
    let huPlayer = "X";

    // winning combinations using the board indexies for instace the first win could be 3 xes in a row
    function winning(board, player) {
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
    function emptyIndexies(board) {
        return board.filter(s => s != "O" && s != "X");
    }


    // keep track of function calls
    var fc = 0;

    // finding the ultimate play on the game that favors the computer
    var bestSpot = minimax(gameBoard.board, aiPlayer);

    //logging the results
    // console.log("index: " + bestSpot.index);
    // console.log("function calls: " + fc);

    // the main minimax function
    function minimax(newBoard, player) {

        //keep track of function calls;
        fc++;

        //available spots
        var availSpots = emptyIndexies(newBoard);

        // checks for the terminal states such as win, lose, and tie and returning a value accordingly
        if (winning(newBoard, huPlayer)) {
            return { score: -10 };
        }
        else if (winning(newBoard, aiPlayer)) {
            return { score: 10 };
        }
        else if (availSpots.length === 0) {
            return { score: 0 };
        }

        // an array to collect all the objects
        var moves = [];

        // loop through available spots
        for (var i = 0; i < availSpots.length; i++) {
            //create an object for each and store the index of that spot that was stored as a number in the object's index key
            var move = {};
            move.index = newBoard[availSpots[i]];

            // set the empty spot to the current player
            newBoard[availSpots[i]] = player;

            //if collect the score resulted from calling minimax on the opponent of the current player
            if (player == aiPlayer) {
                var result = minimax(newBoard, huPlayer);
                move.score = result.score;
            }
            else {
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
        if (player === aiPlayer) {
            // var bestScore = -10000;
            var bestScore = -Infinity;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {

            // else loop over the moves and choose the move with the lowest score
            var bestScore = Infinity;
            // var bestScore = 10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
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


