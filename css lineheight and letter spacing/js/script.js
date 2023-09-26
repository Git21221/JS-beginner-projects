const lineheight = document.querySelector('#lineheight');
const letterspacing = document.querySelector('#letterspacing');
const text = document.querySelector('.text')
lineheight.addEventListener('input', () => {
    text.style.lineHeight = `${lineheight.value / 10}`;
})
letterspacing.addEventListener('input', () => {
    text.style.letterSpacing = `${letterspacing.value}px`;
})