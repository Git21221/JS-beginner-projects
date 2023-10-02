
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

function jump() {
  if (!dino.classList.contains("jump")) {
    dino.classList.add("jump");

    setTimeout(function () {
      dino.classList.remove("jump");
    }, 300);
  }
}


function checkCollision() {
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

  if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
    alert("Game Over!");
  }
}

let isAlive = setInterval(checkCollision, 10);

document.addEventListener("keydown", jump);
