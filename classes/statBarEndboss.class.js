class StatBarEndboss extends drawableObjects {
    imagesEndbossBar = imagesEndbossBar();

    percentage = 100;

    /* #############################################   functions   ############################################# */

    constructor() {
        super().loadImgArray(this.imagesEndbossBar);
        this.setEndbossPersentage(100);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 50;
    }

    /**
     * @example
     * setEndbossPersentage(50);
     * //shows the 50% IMG
     * @param {number} persentage
     */
    setEndbossPersentage(persentage) {
        this.percentage = persentage; // => 0...
        let path = this.imagesEndbossBar[this.resolveImgIndex()];
        this.img = this.imageCache[path];
    }
}