const box = document.querySelector('.box');
const body = document.querySelector('body');
const ranges = document.querySelectorAll('.ranges');
const distancex = document.querySelector('#distanceX');
const distancey = document.querySelector('#distanceY');
const blurr = document.querySelector('#blurr');
const spread = document.querySelector('#spread');
const bgcolor = document.querySelector('#bgColor');
const bxcolor = document.querySelector('#boxColor');
const bgcsscolor = document.querySelector('.bgcolor');
const bxcsscolor = document.querySelector('.bxcolor');
const sdcolor = document.querySelector('#shadowColor');
const css = document.querySelector('.css');
const brrad = document.querySelector('.brrad');
const bxrad = document.querySelector('#bxrad');
const height = document.querySelector('#bxheight');
const heightcss = document.querySelector('.heightcss');
const width = document.querySelector('#bxwidth');
const widthcss = document.querySelector('.widthcss');
let shadow = '#878787';
let parameterLable = document.querySelector(".lable-container h2 i");
let codeLable = document.querySelector(".lable i");
let parameterBox = false;
let codeBox = false;
parameterLable.addEventListener('click', function () {
    if (parameterBox === false) {
        document.querySelector(".parameter").style.maxHeight = 800 + "px";
        parameterBox = true;
    } else {
        document.querySelector(".parameter").style.maxHeight = 0 + "px";
        parameterBox = false;
    }

})
codeLable.addEventListener('click', function () {
    if (codeBox === false) {
        document.querySelector("code").style.maxHeight = 800 + "px";
        codeBox = true;
    } else {
        document.querySelector("code").style.maxHeight = 0 + "px";
        codeBox = false;
    }
})
bxrad.addEventListener('input', () => {
    brrad.innerHTML = `${bxrad.value}`;
    box.style.borderRadius = `${bxrad.value}px`;
})
height.addEventListener('input', () => {
    heightcss.innerHTML = `${height.value}`;
    box.style.height = `${height.value}px`;
})
width.addEventListener('input', () => {
    widthcss.innerHTML = `${width.value}`;
    box.style.width = `${width.value}px`;
})
bgcolor.addEventListener('input', () => {
    body.style.backgroundColor = `${bgcolor.value}`;
    bgcsscolor.innerHTML = `${bgcolor.value}`;
})
bxcolor.addEventListener('input', () => {
    box.style.backgroundColor = `${bxcolor.value}`;
    bxcsscolor.innerHTML = `${bxcolor.value}`;
})
distancex.addEventListener('input', () => {
    box.style.boxShadow = `${distancex.value}px ${distancey.value}px ${blurr.value}px ${spread.value}px ${shadow}`;
    css.innerHTML = `box-shadow: ${distancex.value}px ${distancey.value}px ${blurr.value}px ${spread.value}px ${shadow}`;
})
distancey.addEventListener('input', () => {
    box.style.boxShadow = `${distancex.value}px ${distancey.value}px ${blurr.value}px ${spread.value}px ${shadow}`;
    css.innerHTML = `box-shadow: ${distancex.value}px ${distancey.value}px ${blurr.value}px ${spread.value}px ${shadow}`;
})
spread.addEventListener('input', () => {
    box.style.boxShadow = `${distancex.value}px ${distancey.value}px ${blurr.value}px ${spread.value}px ${shadow}`;
    css.innerHTML = `box-shadow: ${distancex.value}px ${distancey.value}px ${blurr.value}px ${spread.value}px ${shadow}`;
})
blurr.addEventListener('input', () => {
    box.style.boxShadow = `${distancex.value}px ${distancey.value}px ${blurr.value}px ${spread.value}px ${shadow}`;
    css.innerHTML = `box-shadow: ${distancex.value}px ${distancey.value}px ${blurr.value}px ${spread.value}px ${shadow}`;
})
sdcolor.addEventListener('input', () => {
    shadow = sdcolor.value;
    box.style.boxShadow = `${distancex.value}px ${distancey.value}px ${blurr.value}px ${spread.value}px ${shadow}`;
    css.innerHTML = `box${distancex.value}px ${distancey.value}px ${blurr.value}px ${spread.value}px ${shadow}`;
})