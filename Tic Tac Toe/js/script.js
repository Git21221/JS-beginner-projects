const boxes = document.querySelectorAll('.box');
const newGame = document.querySelector('.newGame');
const answer = document.querySelector('.answer');
let won = false;
let isOorX = false; //false means O and true means X
let clicked = [];
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        // console.log(clicked[box.getAttribute('name')]);
        if(!won){
            if (isOorX === false && (clicked[box.getAttribute('name')] !== 'X' && clicked[box.getAttribute('name')] !== 'O')) {
                box.innerHTML = 'O';
                isOorX = true;
                clicked[box.getAttribute('name')] = 'O';
            }
            else if (isOorX === true && (clicked[box.getAttribute('name')] !== 'X' && clicked[box.getAttribute('name')] !== 'O')) {
                box.innerHTML = 'X';
                isOorX = false;
                clicked[box.getAttribute('name')] = 'X';
            }
            let positionsArray = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 4, 8],
                [2, 4, 6],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ];
            // let sign = clicked[0][0];
            let first, zero = 0, x = 0;
            for(let index = 0; index < 8; index++){
                for(let pos = 0; pos < 3; pos++){
                    //checking for 'O'
                    if(clicked[positionsArray[index][pos]] === 'O'){
                        ++zero;
                        // console.log(`zero is: ${zero}`);
                    }
                    //checking for 'X'
                    else if(clicked[positionsArray[index][pos]] === 'X'){
                        ++x;
                        // console.log(`x is: ${x}`);
                    }
                }
                if(zero === 3){
                    answer.innerHTML = "Won O wala player";
                    newGame.removeAttribute('disabled');
                    newGame.style.color = '#fff';
                    won = true;
                    newGame.addEventListener('click', () => {
                        window.location.reload();
                    })
                }
                else if(x === 3) {
                    answer.innerHTML = "Won X wala player";
                    newGame.removeAttribute('disabled');
                    newGame.style.color = '#fff';
                    won = true;
                    newGame.addEventListener('click', () => {
                        window.location.reload();
                    })
                }
                zero = 0;
                x = 0;
            }
        }
    })
})