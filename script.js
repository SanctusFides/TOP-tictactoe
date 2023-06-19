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


// Keeps track of markers and the win count for the players - this keeps the values consistent for each reset
const player = (marker) => {
    const playerName = '';
    const playerMarker = marker;
    let winCount = 0;
    return { playerName, playerMarker, winCount };
}

// I have tried to avoid having global variables but this one is required to attach the player name to it
// Prior to the scoreboard holding the name, this was line in the gameBoard() where the variable human was created
// Need to keep this here so that the player object can attach the name to it in start() and the rest is used in gameBoard
const player1 = player('X');

// Start function is tied to the name entry save button. This changes our game from being hidden via css to visible
function start() {
    const board = document.getElementById('board');
    board.className = 'board';
    const resetButton = document.getElementById('reset-button');
    resetButton.className = 'reset-button';
    const nameField = document.getElementById('nameSection');
    nameField.style = 'display: none';
    const scoreBoard = document.getElementById('scoreBoard');
    scoreBoard.className = 'scoreboard';

    // collects the username from the start and attaches it to the scoreboard
    const name = document.getElementById('nameInput').value;
    player1.playerName = name;
    const playerName = document.getElementById('playerName');
    playerName.innerHTML = `${player1.playerName}: `;
}

// reset function call is on the html for the rest button - calls the resetboard function from the gameboard factory
function reset() {
    gameBoard.resetBoard();
}

// Gamelogic goes below here
const gameBoard = (() => {
    let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

    // Creating the players below and assigning their marker
    const human = player1;

    const npc = player('O');
    const annoucement = document.getElementById('annoucement');

    // Connects the wincounts to variables for easier incrementation
    // Also grabbing the html field to update when incremented
    const playerCounter = document.getElementById('playerScore');
    let playerWinCount = human.winCount;

    const npcCounter = document.getElementById('npcScore');
    let npcWinCount = npc.winCount;

    // variable is used to keep track of which turn it is - flips in the makePlay funct
    let currentTurn = human;

    // Takes the id for the div that the player has clicked on
    const makePlay = (posID) => {
        // This line here clears any possible text about a position being occupied
        annoucement.innerHTML = " ";
        // checks if position is available by default value being " ". This allows any character to be used for markers
        if (board[posID] === ' ') {
            const boardSpot = document.getElementById(posID);
            boardSpot.innerHTML = currentTurn.playerMarker;
            board[posID] = currentTurn.playerMarker;

            if (currentTurn === human) {
                currentTurn = npc;
                wincheck();
            } else {
                currentTurn = human;
                wincheck();
            }
        } else {
            annoucement.innerHTML = "That spot is already taken";
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
            || board[2] === human.playerMarker && board[4] === human.playerMarker && board[6] === human.playerMarker) {

            // annoucement.innerHTML = 'You win!';
            // Loops through the buttons and sets their class to disabled to trigger CSS to stop the clicking function
            for (let i = buttons.length; i-- > 0;) {
                buttons[i].className = 'pos-button-disabled';
            }
            // Increment wincounter and update HTML field with new value
            playerWinCount++;
            playerCounter.innerHTML = playerWinCount;
            alert(`${human.playerName.toUpperCase()} WINS!`);
        }

        if (board[0] === npc.playerMarker && board[1] === npc.playerMarker && board[2] === npc.playerMarker
            || board[3] === npc.playerMarker && board[4] === npc.playerMarker && board[5] === npc.playerMarker
            || board[6] === npc.playerMarker && board[7] === npc.playerMarker && board[8] === npc.playerMarker

            || board[0] === npc.playerMarker && board[3] === npc.playerMarker && board[6] === npc.playerMarker
            || board[1] === npc.playerMarker && board[4] === npc.playerMarker && board[7] === npc.playerMarker
            || board[2] === npc.playerMarker && board[5] === npc.playerMarker && board[8] === npc.playerMarker

            || board[0] === npc.playerMarker && board[4] === npc.playerMarker && board[8] === npc.playerMarker
            || board[2] === npc.playerMarker && board[4] === npc.playerMarker && board[6] === npc.playerMarker) {
            // annoucement.innerHTML = 'YOU LOSE!';
            // Loops through the buttons and sets their class to disabled to trigger CSS to kill the clicking function
            for (let i = buttons.length; i-- > 0;) {
                buttons[i].className = 'pos-button-disabled';
            }
            // Increment wincounter and update HTML field with new value
            npcWinCount++;
            npcCounter.innerHTML = npcWinCount;
            alert(`${human.playerName.toUpperCase()} LOSES!`);
        }
    }

    // Resets the array and clears the board and announcement section
    const resetBoard = () => {
        board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        // reset turn back to human to go first or else the first turn is inconsistent
        currentTurn = human;
        // Since the class name of all the buttons changed to disable clicking, must refetch the buttons to reset values
        let disabledButtons = document.getElementsByClassName("pos-button-disabled");
        for (let i = disabledButtons.length; i-- > 0;) {
            disabledButtons[i].innerHTML = " ";
            disabledButtons[i].className = 'pos-button';
        }
        // A second loop to go through and reset the board while a game is in progress. Top loop only works on completed boards
        let activeButtons = document.getElementsByClassName("pos-button");
        for (let i = activeButtons.length; i-- > 0;) {
            activeButtons[i].innerHTML = " ";
        }
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

