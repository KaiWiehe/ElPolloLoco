class Background extends MovableObject {

    x = 0;
    y = 0;
    width = 720;
    height = 480;

    /* #############################################   functions   ############################################# */

    /**
     * sets the correct image and positions it
     * @param {string} backgroundPath 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(backgroundPath, x, y) {
        super().loadImg(backgroundPath);
        this.x = x;
        this.y = y;
    }
}