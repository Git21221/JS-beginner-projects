let randomNumber = parseInt(Math.random() * 100 + 1);
console.log(randomNumber);
const submit = document.querySelector("#submitguess");
const userValue = document.querySelector("#guessnum");
const guessSlot = document.querySelector(".prevguess");
const lastResult = document.querySelector(".res");
const loh = document.querySelector(".loworhigh");
const startOver = document.querySelector(".resultsec");
const code = document.querySelector("code");
const p = document.createElement('p');
const winSound = document.getElementById('winSound');
const loseSound = document.getElementById('loseSound');
const endGameSound = document.getElementById('endGameSound');
let prevGuess = [];
let numGuess = 1;
let playGame = true;

function playWinSound() {
    winSound.play();
}

function playLoseSound() {
    loseSound.play();
}

function playEndGameSound() {
    endGameSound.play();
}

submit.addEventListener('click', (e) => {
    e.preventDefault();
    const guessNumber = parseInt(userValue.value);
    validateGuess(guessNumber);
});

function validateGuess(guessNumber) {
    if (guessNumber < 1 || guessNumber > 100 || isNaN(guessNumber)) {
        alert("Please enter a valid number");
    } else {
        prevGuess.push(guessNumber);
        if (numGuess === 11) { // Change the condition to 10 (no chances left)
            displayMessage(`Game over, the random number was ${randomNumber}`);
            playEndGameSound(); // Play end game sound
            endGame();
        } else {
            displayGuess(guessNumber);
            checkGuess(guessNumber);
        }
    }
}

function checkGuess(guessNumber) {
    if (guessNumber === randomNumber) {
        displayMessage("You guessed right 🎉");
        playWinSound(); // Play win sound
        endGame();
    } else if (guessNumber < randomNumber) {
        displayMessage(`Number is too low`);
        playLoseSound(); // Play lose sound (optional)
    } else if (guessNumber > randomNumber) {
        displayMessage(`Number is too high`);
        playLoseSound(); // Play lose sound (optional)
    }
}

function displayMessage(message) {
    loh.innerHTML = `<h2>${message}</h2>`;
}

function displayGuess(guessNumber) {
    userValue.value = '';
    guessSlot.innerHTML += `${guessNumber}  `;
    numGuess++;
    lastResult.innerHTML = `${11 - numGuess}`;
    code.innerHTML = `${11 - numGuess}`;
}

function endGame() {
    userValue.value = '';
    userValue.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start a new game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame(); // Move playEndGameSound() to newGame()
}

function newGame() {
    const newGamebtn = document.querySelector('#newGame');
    newGamebtn.addEventListener('click', () => {
        randomNumber = parseInt(Math.random() * 100 + 1);
        console.log(randomNumber);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        lastResult.innerHTML = 10;
        code.innerHTML = 10;
        userValue.removeAttribute('disabled');
        startOver.removeChild(p);
        loh.textContent = "";
        playGame = true;
    });
}