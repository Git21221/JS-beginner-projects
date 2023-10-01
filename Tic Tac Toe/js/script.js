const boxes = document.querySelectorAll('.box');
    const newGame = document.querySelector('.newGame');
    const answer = document.querySelector('.answer');
    let won = false;
    let isOorX = false; // false means O and true means X
    let clicked = new Array(9).fill(null); // Initialize an array to keep track of moves

    boxes.forEach((box) => {
        box.addEventListener('click', () => {
            if (!won && !clicked[box.getAttribute('name')]) {
                if (isOorX === false) {
                    box.innerHTML = 'O';
                    isOorX = true;
                    clicked[box.getAttribute('name')] = 'O';
                } else {
                    box.innerHTML = 'X';
                    isOorX = false;
                    clicked[box.getAttribute('name')] = 'X';
                }
                const winningCombinations = [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [2, 4, 6]
                ];

                for (const combo of winningCombinations) {
                    const [a, b, c] = combo;
                    if (clicked[a] && clicked[a] === clicked[b] && clicked[a] === clicked[c]) {
                        answer.innerHTML = `Player ${clicked[a]} has won!`;
                        won = true;
                        newGame.removeAttribute('disabled');
                        newGame.style.color = '#fff';
                        break;
                    }
                }

                if (!won && !clicked.includes(null)) {
                    answer.innerHTML = "It's a draw!";
                    won = true;
                    newGame.removeAttribute('disabled');
                    newGame.style.color = '#fff';
                }
            }
        });
    });

    newGame.addEventListener('click', () => {
        window.location.reload();
    });