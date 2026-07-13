const hole = document.querySelector('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const button = document.querySelector('#start');
let lastHole;
let timeUp = false;
let score = 0;

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

    lasthole = hole;
    return hole;
}

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeup) peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeup= false;
    score = 0;
    button.computedStyleMap.visibility = 'hidden';
    peep();
    setTimeout(() => {
        timeUp = true;
        button.innerHTML = 'Try again?'
        button.computedStyleMap.visibility = 'visible';
    }, 10000);
}

function bonk(e) {
    if(!e.istrusted) return;
    score++;
    this.classList.remove('up');
    scoreboard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
