const quote = document.querySelector('.quote');
fetch('https://api.quotable.io/random')
.then((response) => {
    return response.json();
})
.then((data) => {
    quote.innerHTML = data.content;
})
.catch((error) => {
    quote.innerHTML = "sorry not found any quote right now";
})