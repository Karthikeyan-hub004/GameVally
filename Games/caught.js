const goat = document.getElementById('goat');
const leaf = document.getElementById('leaf');
const bike = document.getElementById('bike');
const scoreDisplay = document.getElementById('score');
let score = 0;

let goatPosition = 120; // Starting position of the goat
let gameInterval;
let gameSpeed = 5; // Speed of object movement
let GameOver=document.getElementById('gameOver img');
let goatPosition = 125; // Initial position of the goat
const goat = document.getElementById('goat');
// Move buttons
document.querySelector('button[onclick="moveGoat(\'left\')"]').addEventListener('click', () => moveGoat('left'));
document.querySelector('button[onclick="moveGoat(\'right\')"]').addEventListener('click', () => moveGoat('right'));

// Function to move the goat
function moveGoat(direction) {
    if (direction === 'left' && goatPosition > 0) {
        goatPosition -= 20;
    } else if (direction === 'right' && goatPosition < 250) {
        goatPosition += 20;
    }
    goat.style.left = `${goatPosition}px`;
}



function startGame() {
    // Place initial objects randomly
    resetObject(leaf, 'leaf');
    resetObject(bike, 'bike');

    gameInterval = setInterval(() => {
        moveObject(leaf, 'leaf');
        moveObject(bike, 'bike');
        checkCollision();
    }, 20);
}

function moveObject(object, type) {
    let objectTop = parseInt(window.getComputedStyle(object).getPropertyValue('top'));

    if (objectTop >= 600) { // If object goes off the screen, reset it
        resetObject(object, type);
    } else {
        object.style.top = `${objectTop + gameSpeed}px`;
    }
}

function resetObject(object, type) {
    object.style.top = '-50px'; // Start off screen at the top
    object.style.left = `${Math.floor(Math.random() * 270)}px`; // Random X position
}

function checkCollision() {
    let goatRect = goat.getBoundingClientRect();
    let leafRect = leaf.getBoundingClientRect();
    let bikeRect = bike.getBoundingClientRect();

    // Check collision with leaf
    if (goatRect.left < leafRect.right &&
        goatRect.right > leafRect.left &&
        goatRect.top < leafRect.bottom &&
        goatRect.bottom > leafRect.top) {
        score++;
        scoreDisplay.textContent = score;
        resetObject(leaf, 'leaf');
    }

    // Check collision with bike
    if (goatRect.left < bikeRect.right &&
        goatRect.right > bikeRect.left &&
        goatRect.top < bikeRect.bottom &&
        goatRect.bottom > bikeRect.top) {
        clearInterval(gameInterval);
        alert('Game Over! Your Score: ' + score);
        window.location.reload();
    }
}

startGame();
