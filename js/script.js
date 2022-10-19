let canvas;
let world;
let keyboard = new Keyboard();
let play = false;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    setOnClick();
}

window.addEventListener("keydown", (e) => {
    if (e.key === "a") {
        keyboard.left = true;
    } else if (e.key === "ArrowLeft") {
        keyboard.left = true;
    } else if (e.key === "d") {
        keyboard.right = true;
    } else if (e.key === "ArrowRight") {
        keyboard.right = true;
    } else if (e.key === "s") {
        keyboard.down = true;
    } else if (e.key === "ArrowDown") {
        keyboard.down = true;
    } else if (e.keyCode === 32) {
        keyboard.space = true;
    } else if (e.key === "ArrowUp") {
        keyboard.space = true;
    } else if (e.key === "e") {
        keyboard.shot = true;
    } else if (e.key === "r") {
        keyboard.shortShot = true;
    }
})

window.addEventListener("keyup", (e) => {
    if (e.key === "a") {
        keyboard.left = false;
    } else if (e.key === "ArrowLeft") {
        keyboard.left = false;
    } else if (e.key === "d") {
        keyboard.right = false;
    } else if (e.key === "ArrowRight") {
        keyboard.right = false;
    } else if (e.key === "s") {
        keyboard.down = false;
    } else if (e.key === "ArrowDown") {
        keyboard.down = false;
    } else if (e.keyCode === 32) {
        keyboard.space = false;
    } else if (e.key === "ArrowUp") {
        keyboard.space = false;
    } else if (e.key === "e") {
        keyboard.shot = false;
    } else if (e.key === "r") {
        keyboard.shortShot = false;
    }
})

function reload() {
    window.location.reload();
}

function setOnClick() {
    document.getElementById('start').addEventListener('click', () => {
        if (!play) {
            startGame();
        }
    });
}

function closeAll() {
    let startScreen = document.getElementById('startScreen');
    let gameOver = document.getElementById('gameOver');
    let music = document.getElementById('music');
    let settings = document.getElementById('settings');
    let bestPlayer = document.getElementById('bestPlayer');
    canvas.classList.add('d-none');
    startScreen.classList.add('d-none');
    gameOver.classList.add('d-none');
    music.classList.add('d-none');
    settings.classList.add('d-none');
    bestPlayer.classList.add('d-none');
}

function startGame() {
    closeAll();
    canvas.classList.remove('d-none');
    play = true
}

function gameOver() {
    let gameOver = document.getElementById('gameOver');
    closeAll();
    gameOver.classList.remove('d-none');
}

function openMusic() {
    closeAll();
    music.classList.remove('d-none');
}

function openSettings() {
    closeAll();
    settings.classList.remove('d-none');
}

function openBestPlayer() {
    closeAll();
    bestPlayer.classList.remove('d-none');
}