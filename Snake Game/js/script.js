const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        const gridSize = 20;
        let snake = [{ x: 10, y: 10 }];
        let food = { x: 15, y: 15 };
        let direction = 'right';

        function drawSnake() {
            snake.forEach(segment => {
                ctx.fillStyle = '#007BFF';
                ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
            });
        }

        function drawFood() {
            ctx.fillStyle = 'red';
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
        }

        function moveSnake() {
            const head = { ...snake[0] };

            switch (direction) {
                case 'up':
                    head.y--;
                    break;
                case 'down':
                    head.y++;
                    break;
                case 'left':
                    head.x--;
                    break;
                case 'right':
                    head.x++;
                    break;
            }

            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                generateFood();
            } else {
                snake.pop();
            }
        }

        function generateFood() {
            food = {
                x: Math.floor(Math.random() * (canvas.width / gridSize)),
                y: Math.floor(Math.random() * (canvas.height / gridSize))
            };
        }

        function checkCollision() {
            const head = snake[0];
            if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
                gameOver();
            }
            for (let i = 1; i < snake.length; i++) {
                if (head.x === snake[i].x && head.y === snake[i].y) {
                    gameOver();
                }
            }
        }

        function gameOver() {
            clearInterval(gameLoop);
            alert('Game Over!');
            resetGame();
        }

        function resetGame() {
            snake = [{ x: 10, y: 10 }];
            direction = 'right';
            generateFood();
            gameLoop = setInterval(update, 100);
        }

        function update() {
            moveSnake();
            checkCollision();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawSnake();
            drawFood();
        }

        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (direction !== 'down') direction = 'up';
                    break;
                case 'ArrowDown':
                    if (direction !== 'up') direction = 'down';
                    break;
                case 'ArrowLeft':
                    if (direction !== 'right') direction = 'left';
                    break;
                case 'ArrowRight':
                    if (direction !== 'left') direction = 'right';
                    break;
            }
        });

        let gameLoop = setInterval(update, 100);