class Background extends MovableObject {

    x = 0;
    y = 0;
    width = 720;
    height = 480;

    /* #############################################   Funktionen   ############################################# */

    constructor(backgroundPath, x, y) {
        super().loadImg(backgroundPath);
        this.x = x;
        this.y = y;
    }
}