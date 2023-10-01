// Selecting elements
const sec = document.querySelector(".sec");
const min = document.querySelector(".min");
const hour = document.querySelector(".hour");
const day = document.querySelector(".day");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");
const lapBtn = document.querySelector(".lap-button"); // Corrected class name
const lapsContainer = document.querySelector(".laps"); // Corrected class name

let intervalId;
let startTime = 0;

// Function to update the timer display
function updateTimerDisplay() {
  const currentTime = Date.now();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);

  const seconds = elapsedTime % 60;
  const minutes = Math.floor(elapsedTime / 60) % 60;
  const hours = Math.floor(elapsedTime / 3600) % 24;
  const days = Math.floor(elapsedTime / 86400);

  sec.value = seconds;
  min.value = minutes;
  hour.value = hours;
  day.value = days;
}

startBtn.addEventListener("click", () => {
  if (!intervalId) {
    startTime =
      Date.now() -
      (sec.value * 1000 +
        min.value * 60000 +
        hour.value * 3600000 +
        day.value * 86400000);
    intervalId = setInterval(updateTimerDisplay, 1000);
  }
});

stopBtn.addEventListener("click", () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = undefined;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = undefined;
  sec.value = 0;
  min.value = 0;
  hour.value = 0;
  day.value = 0;
  startTime = 0;
  lapsContainer.innerText = "";
});

lapBtn.addEventListener("click", () => {
  if (intervalId) {
    const lapResult = document.createElement("div");
    lapResult.classList.add("lap-result");
    lapResult.innerText = `${day.value}d ${hour.value}h ${min.value}m ${sec.value}s`;
    lapsContainer.appendChild(lapResult);
  }
});
