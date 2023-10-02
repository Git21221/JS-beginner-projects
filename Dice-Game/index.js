var randomN1 = Math.floor(Math.random() * 6) + 1; 

var randomDiceImage = "dice" + randomN1 + ".png"; 

var randomImageSource = "images/" + randomDiceImage;

var image1 = document.querySelectorAll("img")[0];

image1.setAttribute("src", randomImageSource);


var randomN2 = Math.floor(Math.random() * 6) + 1;

var randomImageSource2 = "images/dice" + randomN2 + ".png";

document.querySelectorAll("img")[1].setAttribute("src", randomImageSource2);

//If player 1 wins
if(randomN1>randomN2){
  document.querySelector("h1").innerHTML="🚩player 1 wins!";
}
else if(randomN1<randomN2){
  document.querySelector("h1").innerHTML="player 2 wins 🚩";
}

else{
  document.querySelector("h1").innerHTML="Draw!"
}
