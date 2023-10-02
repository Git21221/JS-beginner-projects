const quote = document.querySelector('.quote');

// function quote() {
//     fetch('https://api.quotable.io/random')
//         .then((response) => {
//             return response.json();
//         })
//         .then((data) => {
//             quote.innerHTML = data.content;
//         })
//         .catch((error) => {
//             quote.innerHTML = "sorry not found any quote right now";
//         })
// }
// JavaScript code to show/hide the loader
function showLoader() {
    document.querySelector('.loader-wrapper').style.display = 'flex';
}

function hideLoader() {
    document.querySelector('.loader-wrapper').style.display = 'none';
}

// Example usage: Call showLoader() before an asynchronous task, and hideLoader() after the task is completed.

const body = document.querySelector('.main');
const arr = ["back1", "back2", "back3", "back4", "back1"]
let prev = 0;
body.classList.add(arr[prev]);

async function quotes() {
    showLoader()
    body.classList.remove(arr[prev]);
    body.classList.add(arr[prev + 1]);
    if (prev < 3) {
        prev++;

    }
    else {
        prev = 0;
    }
    let quotes = await fetch("https://api.quotable.io/random")
    let data = await quotes.json();

quote.innerHTML = data.content;
hideLoader()
}
quotes();



