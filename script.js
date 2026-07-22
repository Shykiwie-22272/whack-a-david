const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const button = document.querySelector('#start');
const gameArea = document.querySelector('.game');
let lastHole;
let timeUp = false;
let score = 0;

gameArea.addEventListener('mousedown', () => {
    gameArea.classList.add('clicked');
});

gameArea.addEventListener('mouseup', () => {
    gameArea.classList.remove('clicked');
});

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

/* Generates random time between min & max milliseconds */


function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];


    if(hole === lastHole) {
        return randomHole(holes);
    }


    lastHole = hole;
    return hole;
}

/* Randomly selects a hole from the list of holes
ensures the same hole doesn't appear again */


function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) peep();
    }, time);
}

/* Causes a mole to pop up randomly from a hole
for a random amount of time and there's a chance
you could click on the same mole twice */


function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    button.style.visibility = 'hidden';
    peep();
    setTimeout(() => {
        timeUp = true;
        button.innerHTML = 'Try again?'
        button.style.visibility = 'visible';
    }, 10000);
}

/* Resets the game, hides the start button, and starts the game by calling the peep() function. 
After a fixed time (10 seconds), it ends the game and displays a "Try again?" button */

function bonk(e) {
    if(!e.isTrusted) return;
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}

/* Handles the "bonking" when the mole is clicked
the score goes up */


moles.forEach(mole => mole.addEventListener('click', bonk));


