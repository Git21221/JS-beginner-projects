const body = document.querySelector('body');
let interval;
const start = document.querySelector('#start').addEventListener('click', () => {
    let changebg = () => {
        body.style.backgroundColor = `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`;
    }
    if(!interval) interval = setInterval(changebg, 1000);
});
const stop = document.querySelector('#stop').addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
});