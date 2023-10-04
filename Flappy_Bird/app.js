//===============board===============

let board;
let boardWidth=360;
let boardHeight=640;
let context;
let isGamePaused = true;
//==================bird=======================
let birdWidth=32;// width/height=60/45=4/3
let birdHeight=24;
let birdX=boardWidth/8;
let birdY=boardHeight/2  ;
let birdImg;

let bird = {
    x:birdX,
    y:birdY,
    width:birdWidth,
    height:birdHeight

}

//==================pipes====================
let pipeArray=[];
let pipeWidth=80;
let pipeHeight=500;
let pipeX=boardWidth;
let pipeY=0;

let topPipeImg;
let bottomPipeImg;

//=========physics=========
let velocityX= -2; //pipes moving left direction
let velocityY = -4;
let gravity = 0.2;

let gameOver = false;
let score=0;

window.onload= function(){
    board=document.getElementById("board");
    board.height =boardHeight;
    board.width  =boardWidth;
    context= board.getContext("2d");

    //=============draw flappy bird======================

    // context.fillStyle="red";
    // context.fillRect(bird.x,bird.y,bird.width,bird.height);

    //loading image
    birdImg = new Image();
    birdImg.src="./images/flappy-bird.png";
    birdImg.onload = function(){
        context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);
    }
    //=========for pipes==============

    topPipeImg=new Image();
    topPipeImg.src="./images/flappybird-pipe.png";

    bottomPipeImg=new Image();
    bottomPipeImg.src="./images/flappybird-pipe2.png";

    requestAnimationFrame(update);
    setInterval(placePipes,1500);// every 1.5s the pipe will be placed
    document.addEventListener("keydown",moveBird);
    showInstructions();
}
document.addEventListener('keydown', function (e) {
    if (e.code === 'KeyI') {
      showInstructions();
    }
  });
  // Function to show the instructions modal
function showInstructions() {
    // Show the instructions modal
    isGamePaused = true;
    const instructionsModal = document.getElementById('instructionsModal');
    instructionsModal.style.display = 'block';
  
    // Hide the canvas while showing the instructions
    board.style.display = 'none';
  
    // Event listener to start the game when the "Start Game" button is clicked
    const startGameBtn = document.getElementById('startGameBtn');
    startGameBtn.addEventListener('click', closeInstructions);
  }
  
  // Function to close the instructions modal and start the game
  function closeInstructions() {
    // Close the instructions modal
    const instructionsModal = document.getElementById('instructionsModal');
    instructionsModal.style.display = 'none';
  
    // Show the canvas and start the game
    board.style.display = 'block';
    isGamePaused = false;
    // Start the game
    startGame();
  }
  // Function to start the game
function startGame() {
    // Add your game initialization logic here
    // For example, you can start your game loop or set game variables.
  
    // Example:
    // Initialize game variables
    gameOver = false;
    score = 0;
    bird.y = birdY;
    pipeArray = [];
  
    // Start your game loop or any necessary game logic here
    requestAnimationFrame(update);
  }
function update(){
    requestAnimationFrame(update);
    if (isGamePaused) { // Check if the game is paused
        return;
      }
    if(gameOver){  
        return;
    }
    context.clearRect(0,0,board.width,board.height);

    //bird
    velocityY+=gravity;
    // bird.y+=velocityY;
    bird.y=Math.max(bird.y+velocityY,0);
    context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);

    if(bird.y > board.height){
        gameOver=true;
    }

    //pipes
    for(let i=0;i< pipeArray.length;i++){
        let pipe=pipeArray[i];
        pipe.x +=velocityX;
        context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);


        if(!pipe.passed && bird.x > pipe.x +pipe.width){
            score+=.5;
            pipe.passed=true;
        }

        if(detectCollision(bird,pipe)){
            gameOver=true;
        }
    }

    //clear pipes
    while(pipeArray.length >0 && pipeArray[0].x<-pipeWidth){
        pipeArray.shift();//remves the first element of the array
    }

    //score

    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score ,5,45);

    if(gameOver){
        context.fillText("GAME OVER",5,90);
        // context.fillText("YOUR SCORE IS "+score,5,135  );
    }

}

function placePipes(){

    if(gameOver){
        return;
    }
    let randomPipeY =pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace=board.height/4;

    

    let topPipe={ 
        img :topPipeImg,
        x: pipeX,
        y:randomPipeY ,
        width :pipeWidth,
        height:pipeHeight,
        passed :false
    }

    pipeArray.push(topPipe);

    let bottomPipe={
        img :bottomPipeImg,
        x :pipeX,
        y : randomPipeY +pipeHeight+openingSpace,
        width:pipeWidth,
        height:pipeHeight,
        passed:false

    }

    pipeArray.push(bottomPipe);
}
// Function to start the game
function startGame() {
    gameOver = false;
    score = 0;
    bird.y = birdY;
    pipeArray = [];
  }
function moveBird(e){
    if(e.code=="Space" || e.code=="ArrowUp" || e.code=="KeyX"){
        if (!isGamePaused) { // Check if the game is not paused
      // Jump
      velocityY = -6; // Adjust jump strength as needed
    }
    else if (e.code == "KeyI") {
        // Toggle game pause on 'I' key press
        isGamePaused = !isGamePaused;
      }
        if(gameOver){
           startGame();
        }

    }
}

function detectCollision(a,b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y +a.height> b.y
}