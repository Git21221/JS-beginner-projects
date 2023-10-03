const cardArray = [
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
];


cardArray.sort(() => 0.5 - Math.random());

const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector("#result");
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

let createBoard = (() => {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/pink-polygonal-vector-background.jpg");
    card.setAttribute("data-id", i);
    card.classList.add("card");
    card.addEventListener("click", flipCard);
    grid.appendChild(card);
  }
})();

function flipCard() {
  let cardId = this.getAttribute("data-id");
  playSound("./files/click.wav");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenId.push(cardId);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 500);
  }
  notify.innerHTML = "";
}

function checkForMatch() {
  const notify = document.querySelector(".notification");
  const cards = document.querySelectorAll("img");
  const optionOneId = cardsChosenId[0];
  const optionTwoId = cardsChosenId[1];

  if (optionOneId == optionTwoId) {
    attribute("images/pink-polygonal-vector-background.jpg");
    notify.innerHTML = `<li>You have clicked the same image!</li>`;
  } else if (cardsChosen[0] === cardsChosen[1]) {
    notify.innerHTML = `<li>You found a match</li>`;
    attribute("images/white.png");
    playSound("./files/correct.wav");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    cardsWon.push(cardsChosen);
  } else {
    attribute("images/pink-polygonal-vector-background.jpg");
    notify.innerHTML = `<li>Sorry, try again</li>`;
  }

  function attribute(value) {
    cards[optionOneId].setAttribute("src", value);
    cards[optionTwoId].setAttribute("src", value);
  }

  cardsChosen = [];
  cardsChosenId = [];
  resultDisplay.textContent = cardsWon.length;
  playSound("./files/wrong.wav");

  if (cardsWon.length === cardArray.length / 2) {
    resultDisplay.textContent = "Congratulations! You found them all!";
    notify.innerHTML = "";
    playSound("./files/complete.wav");
  }
}

function playSound(src) {
  let sound = new Audio(src);
  sound.play();
}
