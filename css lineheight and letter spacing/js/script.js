const lineheight = document.querySelector('#lineheight');
const letterspacing = document.querySelector('#letterspacing');
const text = document.querySelector('.text');
const lineheightcss = document.querySelector('.lineheightcss');
const letterspacingcss = document.querySelector('.letterspacingcss');
lineheight.addEventListener('input', () => {
    text.style.lineHeight = `${lineheight.value / 10}`;
    lineheightcss.innerHTML = `${lineheight.value/ 10}`;
})
letterspacing.addEventListener('input', () => {
    text.style.letterSpacing = `${letterspacing.value}px`;
    letterspacingcss.innerHTML = `${letterspacing.value}`;
})