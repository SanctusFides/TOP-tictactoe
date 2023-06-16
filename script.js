// Top portion is for page/button logic

//collect all the buttons, add a listener to each and then have a function to receive a click
const buttons = document.getElementsByClassName("pos-button");

const buttonClicked = e => {
    const idString = e.target.id;
    // console.log(idString);
    gameBoard.makePlay(idString)
}

for (let button of buttons) {
    button.addEventListener("click", buttonClicked);
}


// Gamelogic goes below here


const gameBoard = (() => {
    let board = [" "," "," "," "," "," "," "," "," "];

    const makePlay = (a) => {
        if (board[a] === ' ') {
            board[a] = a;
            testPrint();
        } else {
            // forrest gump easter egg
            console.log('this seats taken');
        }
    }

    const testPrint = () => {
        console.log(board);
    }

    return {
        makePlay
    }
})();


const player = () => {


}