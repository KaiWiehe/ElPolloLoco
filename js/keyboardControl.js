window.addEventListener('keydown', (e) => {
    if (e.key === 'a') keyboard.left = true;
    else if (e.key === 'ArrowLeft') keyboard.left = true;
    else if (e.key === 'd') keyboard.right = true;
    else if (e.key === 'ArrowRight') keyboard.right = true;
    else if (e.key === 's') keyboard.down = true;
    else if (e.key === 'ArrowDown') keyboard.down = true;
    else if (e.keyCode === 32) keyboard.space = true;
    else if (e.key === 'ArrowUp') keyboard.space = true;
    else if (e.key === 'e') keyboard.shot = true;
    else if (e.key === 'r') keyboard.shortShot = true;
    else if (e.key === 'q') keyboard.openMenu = true;
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'a') keyboard.left = false;
    else if (e.key === 'ArrowLeft') keyboard.left = false;
    else if (e.key === 'd') keyboard.right = false;
    else if (e.key === 'ArrowRight') keyboard.right = false;
    else if (e.key === 's') keyboard.down = false;
    else if (e.key === 'ArrowDown') keyboard.down = false;
    else if (e.keyCode === 32) keyboard.space = false;
    else if (e.key === 'ArrowUp') keyboard.space = false;
    else if (e.key === 'e') keyboard.shot = false;
    else if (e.key === 'r') keyboard.shortShot = false;
    else if (e.key === 'q') keyboard.openMenu = false;
});