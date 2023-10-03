
function playSound(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`button[data-key="${keyCode}"]`);

  if (!audio) return; 

  key.classList.add("clicked");
  audio.currentTime = 0;
  audio.play().catch(error => {
    console.error("Error playing audio: ", error.message);
  });

  setTimeout(() => {
    key.classList.remove("clicked");
  }, 300);
}

function handleKeyOrMouseClick(event) {
  let keyCode;

  if (event.type === "keydown") {
    keyCode = event.keyCode;
  } else if (event.type === "click") {
    keyCode = parseInt(event.target.getAttribute("data-key"));
  }

  playSound(keyCode);
}

window.addEventListener("keydown", handleKeyOrMouseClick);
const keys = document.querySelectorAll(".key");
keys.forEach(key => {
  key.addEventListener("click", handleKeyOrMouseClick);
});
