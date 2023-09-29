const body = document.querySelector('body');
const car = document.querySelector('.car');
const dest = document.querySelector('.dest');
let up = 0, down = 0, right = 0, left = 0;
body.addEventListener('keypress', (e) => {
    console.log(e.key);
    if(e.key === 'w'){
        car.style.top = `-${up}px`;
        up+=3;
        down-=3;
    }
    else if(e.key === 'a'){
        car.style.left = `-${left}px`;
        left+=3;
        right-=3;
    }
    else if(e.key === 's'){
        car.style.top = `${down}px`;
        up-=3;
        down+=3;
    }
    else if(e.key === 'd'){
        car.style.left = `${right}px`;
        right+=3;
        left-=3;
    }
})
// console.log(dest.computedStyleMap().size);