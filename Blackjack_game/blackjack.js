//variable declaration and get elements
let message = document.getElementById("mess-el")
let cardinfo = document.getElementById("card-el")
let totalsum = document.getElementById("sum-el")
let cards = []
let sum = 0
let isalive = true
let use = true
let draw = false
let lose = new Audio("loss.wav")
let win = new Audio("win.mp3")
//start of the game
function startgame() {
    if (use == true) {
        start()
        use = false
    }
}
function start() {
    cards = []
    firstcard = cardvalue()
    secondcard = cardvalue()
    cards.push(firstcard)
    cards.push(secondcard)
    sum = firstcard + secondcard
    isalive = true
    draw = true
    cal()
}
//get random value of card
function cardvalue() {
    let value = Math.ceil(Math.random() * 13)
    if (value > 10) {
        return 10;
    }
    else if (value == 1) {
        return 11;
    }
    else {
        return value;
    }
}
//calculation
function cal() {
    cardinfo.innerText = "Cards :  "
    for (let i = 0; cards.length > i; i++) {
        cardinfo.textContent += cards[i] + "  "
    }
    totalsum.innerText = "Sum: " + sum
    if (sum < 21) {
        message.innerText = "Want to draw a new card?"
    }
    else if (sum == 21) {
        use = true
        isalive = false
        win.play();
        message.innerText = "Congrats you got Blackjack!!!"
        draw = false

    }
    else {
        use = true
        isalive = false
        draw = false
        lose.play()
        message.textContent = "You are Out,start again"

    }
}
//draw a new card
function drawcard() {
    if (draw == true) {
        newcard()
    }
}
function newcard() {
    let ncard = cardvalue()
    cards.push(ncard)
    sum += ncard
    if (isalive == true) {
        cal()
    }
}


