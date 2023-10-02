function playSound(n) {
  const audio = document.querySelector(`audio[data-key="${n}"]`);
  const key = document.querySelector(`.key[data-key="${n}"]`);
  key.classList.add("clicked");

  setTimeout(() => {
    key.classList.remove("clicked");
  }, 300);

  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
}

window.document.addEventListener("keydown", (e) => {
  console.log(e.key, e.key.toUpperCase().charCodeAt(0));
  playSound(e.key.toUpperCase().charCodeAt(0));
});
