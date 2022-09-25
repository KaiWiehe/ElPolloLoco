class MovableObject {
    x = 120;
    y = 265;
    img;
    height = 150;
    width = 80;

    /* #############################################   Funktionen   ############################################# */

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('moving right');
    }

    moveLeft() {
        console.log('moving left');
    }
}