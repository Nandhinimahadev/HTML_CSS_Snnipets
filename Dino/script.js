let screen;
let screenWidth = 850;
let screenHeight = 300;
let context;

let dinoWidth = 75;
let dinoHeight = 84;
let dinoX = 50;
let dinoY = screenHeight - dinoHeight;
let dinoImage;

let dino = {
    x: dinoX,
    y: dinoY,
    width: dinoWidth,
    height: dinoHeight
}

let cactusArray = [];

let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = screenHeight - cactusHeight;

let cactusImage1;
let cactusImage2;
let cactusImage3;

let velocityX = -8;
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;
let gameStarted=false;

window.onload = function() {
    screen = document.getElementById("dinoBoard");
    screen.height = screenHeight;
    screen.width = screenWidth;
    context = screen.getContext("2d");

    dinoImage = new Image();
    dinoImage.src = './img/dino.png';
    dinoImage.onload = function() {
        context.drawImage(dinoImage, dino.x, dino.y, dino.width, dino.height);
    }

    cactusImage1 = new Image();
    cactusImage1.src = './img/cactus1.png';

    cactusImage2 = new Image();
    cactusImage2.src = './img/cactus2.png';

    cactusImage3 = new Image();
    cactusImage3.src = './img/cactus3.png';

    requestAnimationFrame(updateDino);
    setInterval(placeCactus, 1000);
    document.addEventListener("keydown", moveDino);
}

function updateDino() {
    requestAnimationFrame(updateDino);
    if (gameOver) {
        return;
    }
    context.clearRect(0, 0, screen.width, screen.height);

    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY);
    context.drawImage(dinoImage, dino.x, dino.y, dino.width, dino.height);

    for (let i = 0; i < cactusArray.length; i++) {
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

        if (detectCollision(dino, cactus)) {
            gameOver = true;
            dinoImage.src = "./img/dino-dead.png";
            dinoImage.onload = function() {
                context.drawImage(dinoImage +image, dino.x, dino.y, dino.width, dino.height);
            }
            showResetImage();

        }
        
    }

    if (gameStarted) {
        context.fillStyle = "black";
        context.font = "20px Arial";
        context.fillText(score, 5, 20);
        score++;
    }
}

function moveDino(e) {
    if (gameOver) {
        return;
    }

 
    if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
        velocityY = -10;
        gameStarted = true;
    }
}

function placeCactus() {
    if (gameOver) {
        return;
    }
    let cactus = {
        img: null,
        x: cactusX,
        y: cactusY,
        width: null,
        height: cactusHeight
    }
    let placeCactusChance = Math.random();
    if (placeCactusChance > .90) {
        cactus.img = cactusImage3;
        cactus.width = cactus3Width;
        cactusArray.push(cactus);
    } else if (placeCactusChance > .70) {
        cactus.img = cactusImage2;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    } else if (placeCactusChance > .50) {
        cactus.img = cactusImage1;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);
    }

    if (cactusArray.length > 5) {
        cactusArray.shift();
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function showResetImage() {
    const resetImage = document.getElementById("resetImage");
    resetImage.style.display = "block";
}

function resetGame() {
    window.location.reload();
}