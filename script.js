
const gameBoard = (() => { 
    
    let binge = document.querySelectorAll("div > div > div");
    
    for(let i = 0; i < binge.length; i++) {
    binge[i].addEventListener('click', function() {
    
        console.log(this);
    },{once: true});
}
    
    
    
    let board = 
        [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]

    return {
        board
    }
})();

const Player = (name) => {

    return {
        name
    }
}

let player1 = Player("human");
let player2 = Player("computer");

const gameFlow = (() => { 
    
    return {
       
    }
})();