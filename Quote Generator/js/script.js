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


async function quotes() {
    showLoader()
    let quotes = await fetch("https://api.quotable.io/random")
    let data = await quotes.json();

quote.innerHTML = data.content;
hideLoader()
}
quotes();



