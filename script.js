// Top portion is for page/button logic

//collect all the buttons, add a listener to each and then have a function to receive a click
const buttons = document.getElementsByClassName("pos-button");
const buttonClicked = e => {
    const idString = e.target.id;
    gameBoard.makePlay(idString);
}
for (let button of buttons) {
    button.addEventListener("click", buttonClicked);
}


// Gamelogic goes below here
const player = (marker) => {
    const playerMarker = marker;

    return {playerMarker};
}
const gameBoard = (() => {
    let board = [" "," "," "," "," "," "," "," "," "];

    // Creating the players below and assigning their marker
    const human = player('X');
    const npc = player('O');
    const annoucement = document.getElementById('annoucement');


    // variable is used to keep track of which turn it is - flips in the makePlay funct
    let currentTurn = human;

    const makePlay = (posID) => {
        // This line here clears any possible text about a position being occupied
        annoucement.innerHTML = " ";
        if (board[posID] === ' ') {
            
            const boardSpot = document.getElementById(posID);
            boardSpot.innerHTML = currentTurn.playerMarker;
            board[posID] = currentTurn.playerMarker;
            
            if (currentTurn === human) {
                wincheck();
                currentTurn = npc;
            } else {
                wincheck();
                currentTurn = human;
            }
        } else {
            // forrest gump easter 
            annoucement.innerHTML = "That spot is already taken";
            console.log('seats taken');
        }
    }

    const wincheck = () => {
        // Loops through each row and both diagonals to check if they all match the player marker

        if (board[0] === human.playerMarker && board[1] === human.playerMarker && board[2] === human.playerMarker 
        || board[3] === human.playerMarker && board[4] === human.playerMarker && board[5] === human.playerMarker
        || board[6] === human.playerMarker && board[7] === human.playerMarker && board[8] === human.playerMarker

        || board[0] === human.playerMarker && board[3] === human.playerMarker && board[6] === human.playerMarker
        || board[1] === human.playerMarker && board[4] === human.playerMarker && board[7] === human.playerMarker
        || board[2] === human.playerMarker && board[5] === human.playerMarker && board[8] === human.playerMarker

        || board[0] === human.playerMarker && board[4] === human.playerMarker && board[8] === human.playerMarker
        || board[2] === human.playerMarker&& board[4] === human.playerMarker && board[6] === human.playerMarker) {
            console.log('YOU WIN!');
            annoucement.innerHTML = 'You win!';
        }
    }

    // Resets the array and clears the board and announcement section
    const resetBoard = () => {
        board = [" "," "," "," "," "," "," "," "," "];
        for (let button of buttons) {
            button.innerHTML = " ";
        };
        annoucement.innerHTML = " ";
    }
    


    const testPrint = () => {
        console.log(board);
    }

    return {
        makePlay,
        resetBoard,
        testPrint
    }
})();

