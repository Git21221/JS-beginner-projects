let imagesno = [0, 1, 2, 3];
let animals = ["deer", "tiger", "lion", "elephant"];
let secretNumber = Math.trunc(Math.random() * 4);
let head = document.querySelector(".heading");
head.textContent = `Guess the image of ${animals[secretNumber]}`;
const audio1 = new Audio("success.mp3");
const audio2 = new Audio("wrong.mp3");
let images = document.getElementsByClassName("cImage");
let aimages = Array.from(images);
let images1 = document.querySelector("#I1");
let images2 = document.querySelector("#I2");
let images3 = document.querySelector("#I3");
let images4 = document.querySelector("#I4");
let flag = 0;
let pg = document.querySelector(".playagain");

pg.addEventListener("click", function () {
  images1.addEventListener("click", game);
  images2.addEventListener("click", game);
  images3.addEventListener("click", game);
  images4.addEventListener("click", game);
  secretNumber = Math.trunc(Math.random() * 4);
  head.textContent = `Guess the image of ${animals[secretNumber]}`;
  // images1.src="default.jpg";
  // images2.src="default.jpg";
  // images3.src="default.jpg";
  aimages.forEach(function (i) {
    i.src = "default.jpg";
    i.style.width = "16rem";
    i.style.height = "16rem";
    i.style.border = "none";
    i.style.margin = "1rem";
    
  });
});
let game = function () {
  function random_sort(a, b) {
    return Math.random() - 0.5;
  }
  imagesno.sort(random_sort);
  this.src = `img${imagesno[0]}.jpg`;
  if (secretNumber === imagesno[0]) {
    this.style.width = "10rem";
    this.style.height = "10rem";
    this.style.border = "2px solid yellow";
    this.style.marginRight = "10px";
    this.style.marginLeft = "10px";
    head.textContent = `Your guess was correct 🎉 }`;
    audio1.play();
    images1.removeEventListener("click", game);
    images2.removeEventListener("click", game);
    images3.removeEventListener("click", game);
    images4.removeEventListener("click", game);
    flag = 1;
  } else {
    audio2.play();
    this.style.width = "10rem";
    this.style.height = "10rem";
    this.style.border = "2px solid red";
    this.style.marginRight = "10px";
    this.style.marginLeft = "10px";
    head.textContent = `sorry you lost 😞 `;
    images1.removeEventListener("click", game);
    images2.removeEventListener("click", game);
    images3.removeEventListener("click", game);
    images4.removeEventListener("click", game);
    flag = 1;
  }
};
images1.addEventListener("click", game);
images2.addEventListener("click", game);
images3.addEventListener("click", game);
images4.addEventListener("click", game);
