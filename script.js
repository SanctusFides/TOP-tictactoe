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

    // variable is used to keep track of which turn it is - flips in the makePlay funct
    let currentTurn = human;

    const makePlay = (posID) => {
        if (board[posID] === ' ') {

            const boardSpot = document.getElementById(posID);
            boardSpot.innerHTML = currentTurn.playerMarker;
            board[posID] = currentTurn.playerMarker;
            
            if (currentTurn === human) {
                currentTurn = npc;
            } else {
                currentTurn = human;
            }
        } else {
            // forrest gump easter 
            console.log('seats taken');
        }
    }

    const testPrint = () => {
        console.log(board);
    }

    return {
        makePlay
    }
})();

