const pickColor = document.querySelector('#pickColor');
const colornamehex = document.querySelector('.colorNamehex');
const colornamergb = document.querySelector('.colorNamergb');
const body = document.querySelector('body')
pickColor.addEventListener('input', (e) => {
    let color = e.target.value;
    const r = parseInt(color.substr(1, 2), 16)
    const g = parseInt(color.substr(3, 2), 16)
    const b = parseInt(color.substr(5, 2), 16)
    // console.log(color.value);
    console.log([r, g, b])
    body.style.backgroundColor = `${color}`;
    colornamehex.innerHTML = `Hex Code: ${color}`;
    colornamergb.innerHTML = `RGB Code: RGB(${r}, ${g}, ${b})`;
})