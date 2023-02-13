class StatBarCoin extends drawableObjects {
    imagesCoin = imagesCoin();

    percentage = 100;

    /* #############################################   functions   ############################################# */

    constructor() {
        super().loadImgArray(this.imagesCoin);
        this.setCoinPersentage(0);
        this.x = 10;
        this.y = 40;
        this.width = 200;
        this.height = 50;
    }

    /**
     * @example
     * setCoinPersentage(50);
     * //shows the 50% IMG
     * @param {number} persentage
     */
    setCoinPersentage(persentage) {
        this.percentage = persentage; // => 0...
        let path = this.imagesCoin[this.resolveImgIndex()];
        this.img = this.imageCache[path];
    }
}