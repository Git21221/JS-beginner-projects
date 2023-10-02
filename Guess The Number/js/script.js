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
let prevGuess = [];
let numGuess = 1;
let playGame = true;
submit.addEventListener('click', (e) => {
    e.preventDefault();
    const guessNumber = parseInt(userValue.value);
    validateGuess(guessNumber);
});
function validateGuess(guessNumber) {
    if (guessNumber < 1 || guessNumber > 100 || isNaN(guessNumber)) alert("please enter valid number");
    else {
        prevGuess.push(guessNumber);
        if (numGuess === 11) {
            displayMessege(`game over, random number was ${randomNumber}`);
            endGame();
        }
        else {
            displayGuess(guessNumber);
            checkGuess(guessNumber);
        }
    }
}
function checkGuess(guessNumber) {
    if (guessNumber === randomNumber) {
        displayMessege("You guessed right 🎉");
        endGame();
    }
    else if (guessNumber < randomNumber) displayMessege(`Number is too low`);
    else if (guessNumber > randomNumber) displayMessege(`Number is too high`);
}
function displayMessege(messege) {
    loh.innerHTML = `<h2>${messege}</h2>`;
}
function displayGuess(guessNumber) {
    userValue.value = '';
    guessSlot.innerHTML += `${guessNumber}  `;
    numGuess++;
    lastResult.innerHTML = `${11 - numGuess}`;
    code.innerHTML = `${11 - numGuess}`;
}
function endGame(){
    userValue.value = '';
    userValue.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start a new game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
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
        loh.textContent="";
        playGame = true;
    });
}