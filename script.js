// CONSTANT VARIABLES

const PLAYERS  = {
    '1': 'X',
    '-1': 'O',
    'null': ''
};

const COMBOS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// VARIABLES

let winner, turn, gameboard;

// DOM ELEMENTS
const message = document.querySelector('.message');
const board = document.querySelector('#gameboard');
const squares = document.querySelectorAll('.square');
const button = document.querySelector('button');

// FUNCTIONS

startGame();

// function to start the game
function startGame(){
    // create the gameboard
    // gameboard = [null, null, null, null, null, null, null, null, null];
    gameboard = new Array(9).fill(null);
    // set winner 
    winner = false;
    // set turn
    turn = 1;
    render();
}

function getWinner(){
    // see if the gameboard contains a winning combo
    for(let i = 0; i < COMBOS.length; i++){
       if(Math.abs(
           gameboard[COMBOS[i][0]] +
           gameboard[COMBOS[i][1]] +
           gameboard[COMBOS[i][2]]
       ) === 3) return gameboard[COMBOS[i][0]]
    }
    if(gameboard.includes(null)) return false;
    return 'T';
}

function render(){
    // render the gameboard onto the DOM
    gameboard.forEach((value, index)=>{
        squares[index].innerText = PLAYERS[value]
    })

    if(!winner){
        message.innerText = `${PLAYERS[turn]}'s Turn`
    } else if (winner === 'T'){
        message.innerText = 'It\'s a tie';
    } else {
        message.innerText = `${PLAYERS[winner]} Wins!`
    }
}

function handleClick(evt){
    const position = evt.target.dataset.index;
    if(winner || gameboard[position]) return;
    gameboard[position] = turn;
    turn *= -1;
    winner = getWinner();
    render();
}



// EVENT LISTENERS
board.addEventListener('click', handleClick);
button.addEventListener('click', startGame)