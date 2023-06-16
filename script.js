const buttons = document.getElementsByClassName("pos-button");


const testFunct = e => {
    const idString = e.target.id;
    const idSplit = idString.split(' ');
    const row = idSplit[0];
    const rowValue = row.slice(-1);

    const pos = idSplit[1];
    const posValue = pos.slice(-1);
    console.log(rowValue + posValue);
}


for (let button of buttons) {
    button.addEventListener("click", testFunct);
}

let board = [];

const gameBoard = ((board) => {



})();


const player = () => {


}