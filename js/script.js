let canvas;
let world;
let keyboard = new Keyboard();
let play = false;
let timer = new Timer();
let gameStarted = false;

//audio
windSound = new Audio('assets/audio/wind.mp3');
loseSound = new Audio('assets/audio/lose.wav');
winSound = new Audio('assets/audio/win.wav');
//audio end

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    mobileControl();
    openSettingsInterval();
}

window.addEventListener('load', () => {
    let loader = document.getElementById('loader');
    loader.classList.add('d-none');
});

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
    gameStarted = true;
    closeAll();
    windSound.play();
    windSound.volume = 0.3;
    canvas.classList.remove('d-none');
    play = true;
    timer.startTimer();
    mobile() && hud.classList.remove('d-none');
}

function gameOver() {
    windSound.pause();
    loseSound.play();
    loseSound.volume = 0.3;
    let gameOver = document.getElementById('gameOver');
    closeAll();
    play = false;
    gameOver.classList.remove('d-none');
    world.level.endboss[0].energy = 100;
    //otherwise it can happen that the gameover screen is shown first and then the win screen.
    //Because the endboss dies shortly after
}

/**
 * opens the settings on keyboardClick
 */
function openSettingsInterval() {
    setInterval(() => {
        keyboard.openMenu && openSettings()
    }, 60 / 1000);
}

/**
 * opens the setting
 */
function openSettings() {
    closeAll();
    play = false;
    windSound.pause();
    settings.classList.remove('d-none');
    menuMobile() && buttonAktive();
}

function openWinGame() {
    play = false;
    windSound.pause();
    winSound.play();
    closeAll();
    winGame.classList.remove('d-none');
    document.getElementById('coins').innerHTML = world.coinCounter / 10 + ' / 10';
    world.character.energy = 100000;
    clearInterval(timer.timerInterval);
    /*otherwise it can happen that when the endboss dies and shortly afterwards Char,
    the gameover screen will showed*/
}

function openCanvas() {
    closeAll();
    canvas.classList.remove('d-none');
}

// -----------------MobileMenuButton--------------------------

var UD_MENU_OPEN = false;

function buttonAktive() {
    if (menuClosed()) {
        UD_MENU_OPEN = true;
        document.getElementById('ud_menu_icon').classList.add('is-active');
        document.getElementById('info').style = 'position: absolute;display: block;';
        document.getElementById('info').classList.remove('menuAnimationClose');
        document.getElementById('info').classList.add('menuAnimationOpen');
    } else {
        UD_MENU_OPEN = false;
        document.getElementById('ud_menu_icon').classList.remove('is-active');
        document.getElementById('info').classList.remove('menuAnimationOpen');
        document.getElementById('info').classList.add('menuAnimationClose');
        setTimeout(() => (document.getElementById('info').style = ''), 490);
    }
}

function closeMenu() {
    UD_MENU_OPEN = false;
    document.getElementById('ud_menu_icon').classList.remove('is-active');
    document.getElementById('info').classList.remove('menuAnimationOpen');
    document.getElementById('info').classList.add('menuAnimationClose');
    setTimeout(() => (document.getElementById('info').style = ''), 490);
}

function menuClosed() {
    return !UD_MENU_OPEN;
}

// -------------------------MobileMenuButton--------------------------------

function mobile() {
    return window.innerWidth <= 1000;
}

function menuMobile() {
    return window.innerWidth <= 720;
}

function fullscreen() {
    if (!gameStarted) {
        closeAll();
        canvas.style = "border: 0px;border-radius: unset;max-height: 100vh;";
        startScreen.classList.remove('d-none');
        let contentContainer = document.getElementById('contentContainer');
        enterFullscreen(contentContainer);
    } else {
        let err = document.getElementById('error');
        err.innerHTML = 'Um das Spiel im Vollbildmodus zu öffnen, müssen Sie es zuerst neu starten.'
    }
}

function enterFullscreen(element) {
    if (!play) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.msRequestFullscreen) {
            // for IE11 (remove June 15, 2022)
            element.msRequestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            // iOS Safari
            element.webkitRequestFullscreen();
        }
    }
}

function exitFullscreen() {
    document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen && document.webkitExitFullscreen();
}