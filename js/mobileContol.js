/**
 * a JSON object filled with all ID's and the matching key
 */
let mobileJSON;

function mobileControl() {
    mobileJSON = [{
        'path': document.getElementById('mobileLeft'),
        'keyboard': 'left'
    }, {
        'path': document.getElementById('mobileRight'),
        'keyboard': 'right'
    }, {
        'path': document.getElementById('mobileShot'),
        'keyboard': 'shot'
    }, {
        'path': document.getElementById('mobileSpace'),
        'keyboard': 'space'
    }];
    touchstart();
    touchend();
}

function touchstart() {
    canvas.addEventListener('touchstart', (e) => e.preventDefault());

    mobileJSON.forEach(el => {
        el.path.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (el.keyboard === 'left') keyboard.left = true;
            else if (el.keyboard === 'right') keyboard.right = true;
            else if (el.keyboard === 'shot') keyboard.shot = true;
            else if (el.keyboard === 'space') keyboard.space = true;
        });
    });
}

function touchend() {
    mobileJSON.forEach(el => {
        el.path.addEventListener('touchend', (e) => {
            if (el.keyboard === 'left') keyboard.left = false;
            else if (el.keyboard === 'right') keyboard.right = false;
            else if (el.keyboard === 'shot') keyboard.shot = false;
            else if (el.keyboard === 'space') keyboard.space = false;
        });
    });
}