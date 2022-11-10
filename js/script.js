let canvas;
let world;
let keyboard = new Keyboard();
let play = false;
let timerInterval;

windSound = new Audio('assets/audio/wind.mp3');
loseSound = new Audio('assets/audio/lose.wav');
winSound = new Audio('assets/audio/win.wav');

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    mobileControlling();
    screen.orientation.lock('landscape'); // TODO 
}

window.addEventListener("load", () => {
    let loader = document.getElementById('loader');
    loader.classList.add('d-none');
})

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

function mobileControlling() {
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
    });

    document.getElementById('mobileLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.left = true;
    });

    document.getElementById('mobileRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.right = true;
    });

    document.getElementById('mobileShot').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.shot = true;
    });

    document.getElementById('mobileSpace').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.space = true;
    });

    document.getElementById('mobileLeft').addEventListener('touchend', (e) => {
        keyboard.left = false;
    });

    document.getElementById('mobileRight').addEventListener('touchend', (e) => {
        keyboard.right = false;
    });

    document.getElementById('mobileShot').addEventListener('touchend', (e) => {
        keyboard.shot = false;
    });

    document.getElementById('mobileSpace').addEventListener('touchend', (e) => {
        keyboard.space = false;
    });
}

function reload() {
    window.location.reload();
}

function closeAll() {
    let startScreen = document.getElementById('startScreen');
    let gameOver = document.getElementById('gameOver');
    let settings = document.getElementById('settings');
    let winGame = document.getElementById('winGame');
    let hud = document.getElementById('hud');
    canvas.classList.add('d-none');
    startScreen.classList.add('d-none');
    gameOver.classList.add('d-none');
    settings.classList.add('d-none');
    winGame.classList.add('d-none');
    hud.classList.add('d-none');
}

function startGame() {
    closeAll();
    windSound.play();
    windSound.volume = 0.3;
    canvas.classList.remove('d-none');
    play = true
    startTimer();
    if (mobile()) {
        hud.classList.remove('d-none');
    }
}

function gameOver() {
    windSound.pause();
    loseSound.play();
    loseSound.volume = 0.3;
    let gameOver = document.getElementById('gameOver');
    closeAll();
    play = false;
    gameOver.classList.remove('d-none');
    world.level.endboss[0].energy = 100; // sonst kann es dazu kommen das erst der gameover screen gezeigt wird und dann der win screen. weil der endboss kurz danach stirbt
}

function openSettings() {
    closeAll();
    play = false;
    settings.classList.remove('d-none');
}

function openWinGame() {
    play = false;
    windSound.pause();
    winSound.play();
    closeAll();
    winGame.classList.remove('d-none');
    document.getElementById('coins').innerHTML = world.coinCounter / 10 + ' / 10';
    world.character.energy = 100000; //sonst kann es dazu kommen das wenn der endboss stirbt und kurz danach pepe das doch gameover da stand
}

function openCanvas() {
    closeAll();
    debugger
    canvas.classList.remove('d-none');
}

startTimer = () => {
    let timer = document.getElementById('timer');

    clearInterval(timerInterval);
    let second = 0,
        minute = 0,
        hour = 0;

    timerInterval = setInterval(function() {
        timer.innerHTML =
            (hour ? hour + ':' : '') +
            (minute < 10 ? '0' + minute : minute) +
            ':' +
            (second < 10 ? '0' + second : second);

        second++;

        if (second == 60) {
            minute++;
            second = 0;
        }

        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);

};

// ------------------------------------------------------

var UD_MENU_OPEN = false;

function buttonAktive() {
    if (menuClosed()) {
        UD_MENU_OPEN = true;
        document.getElementById("ud_menu_icon").classList.add("is-active");
        document.getElementById('info').style = "position: absolute;display: block;";
        document.getElementById('info').classList.remove('menuAnimationClose');
        document.getElementById('info').classList.add('menuAnimationOpen');
    } else {
        UD_MENU_OPEN = false;
        document.getElementById("ud_menu_icon").classList.remove("is-active");
        document.getElementById('info').classList.remove('menuAnimationOpen');
        document.getElementById('info').classList.add('menuAnimationClose');
        setTimeout(() => {
            document.getElementById('info').style = "";
        }, 490);
    }
}

function closeMenu() {
    UD_MENU_OPEN = false
    document.getElementById("ud_menu_icon").classList.remove("is-active");
    document.getElementById('info').classList.remove('menuAnimationOpen');
    document.getElementById('info').classList.add('menuAnimationClose');
    setTimeout(() => {
        document.getElementById('info').style = "";
    }, 490);
}

function menuClosed() {
    return !UD_MENU_OPEN;
}

// ---------------------------------------------------------

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);


// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

function mobile() {
    return window.innerWidth < 1000;
}

function fullscreen() {
    closeAll();
    canvas.style = "border: 0;border-radius: unset";
    startScreen.classList.remove('d-none');
    let contentContainer = document.getElementById('contentContainer');
    enterFullscreen(contentContainer);
}

function enterFullscreen(element) {
    if (!play) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.msRequestFullscreen) { // for IE11 (remove June 15, 2022)
            element.msRequestFullscreen();
        } else if (element.webkitRequestFullscreen) { // iOS Safari
            element.webkitRequestFullscreen();
        }
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}