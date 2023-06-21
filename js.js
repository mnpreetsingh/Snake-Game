// Board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// Snake Head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

// Snake Food
var foodX;
var foodY;

// Speed of a snake 
var velocityX = 0;
var velocityY = 0;

// Body of a snake
var snakeBody = [];

// For gameover
var gameover = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    //used for drawing the board
    placefood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000 / 10); //100 miliseconds
}

function update() {
    if (gameover) {
        return;
    }
    context.fillStyle = "rgb(207, 248, 145)";
    context.fillRect(0, 0, board.width, board.height);
    //For food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placefood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    //For snake
    context.fillStyle = "blue";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    // Game over Condition
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameover = true;
        alert("Game over");
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameover = true;
            alert("Game over");
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placefood() {
    // 0-1) * cols -> (0-19.999) -> (0-19) * 25;
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}