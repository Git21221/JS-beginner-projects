const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";

    infoTextEl.innerText = `Searching the meaning of "${word}" `;

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const res = await fetch(url).then((res) => res.json());

    if (res.title) {
      meaningContainerEl.style.display = "block";
      infoTextEl.style.display = "none";

      titleEl.innerText = word;
      meaningEl.innerText = "N/A";
      audioEl.style.display = "none";
    } else {
      infoTextEl.style.display = "none";
      meaningContainerEl.style.display = "block";
      audioEl.style.display = "inline-flex";

      titleEl.innerText = res[0].word;
      meaningEl.innerText = res[0].meanings[0].definitions[0].definition;
      audioEl.src = res[0].phonetics[0].audio;
    }
  } catch (error) {
    console.log(error);
    infoTextEl.innerText = ` "${error}" `;
  }
}

inputEl.addEventListener("keyup", (e) => {
  // input shouldn't be empty
  // accept only when something is typed and then enter is pressed , else not
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});
