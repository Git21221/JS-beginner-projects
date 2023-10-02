var timer = 60;
var score = 0;
var randoms = 0;
var highestScore = 0;
var gameActive = false;

function initGame() {
    if (!gameActive) {
        gameActive = true;
        timer = 60;
        score = 0;
        document.getElementById("scorecard").textContent = score;
        setTimer();
        newHit();
        bubbleMaker();
        document.querySelector("#pbottom").addEventListener("click", clickHandler); // Add this line to reattach the event listener
    }
}
function playPopSound() {
    var popSound = document.getElementById("popSound");
    popSound.play();
}
function bubbleMaker() {
    var bubbles = '';

    for (let i = 1; i <= 112; i++) {
        var randomno = Math.floor(Math.random() * 10);
        bubbles += `<div class="bubble">${randomno}</div>`;
    }

    document.getElementById("pbottom").innerHTML = bubbles;
}

function increaseScore() {
    score += 10;
    document.querySelector("#scorecard").textContent = score;
}

function newHit() {
    randoms = Math.floor(Math.random() * 10);
    document.querySelector("#hit").textContent = randoms;
}

function setTimer() {
    var time = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.getElementById("timer").textContent = timer;
        } else {
            clearInterval(time);
            gameActive = false;
            document.getElementById("pbottom").innerHTML = `<div class="gameover"><h1>Game Over</h1>   <h1>Final Score:${score}</h1></div> `;
            document.querySelector("#pbottom").removeEventListener("click", clickHandler);
        }
    }, 1000);
}

function clickHandler(details) {
    if (!gameActive) {
        return;
    }

    var clickedBubble = Number(details.target.textContent);
    var hitValue = Number(document.querySelector("#hit").textContent);

    if (clickedBubble === hitValue) {
        increaseScore();
        playPopSound();
    }

    bubbleMaker();
    newHit();
}

document.getElementById("startButton").addEventListener("click", initGame);
