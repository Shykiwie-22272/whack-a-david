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


function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];


    if(hole === lastHole) {
        console.log('Same one');
        return randomHole(holes);
    }


    lastHole = hole;
    return hole;
}


function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) peep();
    }, time);
}


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


function bonk(e) {
    if(!e.isTrusted) return;
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}


moles.forEach(mole => mole.addEventListener('click', bonk));


