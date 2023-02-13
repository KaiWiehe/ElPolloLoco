class StatBarBottle extends drawableObjects {
    imagesBottle = imagesBottle();

    percentage = 100;

    /* #############################################   functions   ############################################# */

    constructor() {
        super().loadImgArray(this.imagesBottle);
        this.setBottlePersentage(0);
        this.x = 10;
        this.y = 80;
        this.width = 200;
        this.height = 50;
    }

    /**
     * @example
     * setBottlePersentage(50);
     * //shows the 50% IMG
     * @param {number} persentage
     */
    setBottlePersentage(persentage) {
        this.percentage = persentage; // => 0...
        let path = this.imagesBottle[this.resolveImgIndex()];
        this.img = this.imageCache[path];
    }
}