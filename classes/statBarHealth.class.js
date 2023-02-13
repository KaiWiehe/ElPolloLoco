class StatBarHealth extends drawableObjects {
    imagesHealth = imagesHealth();

    percentage = 100;

    /* #############################################   functions   ############################################# */

    constructor() {
        super().loadImgArray(this.imagesHealth);
        this.setHealthPersentage(100);
        this.x = 10;
        this.y = 0;
        this.width = 200;
        this.height = 50;
    }

    /**
     * @example
     * setHealthPersentage(50);
     * //shows the 50% IMG
     * @param {number} persentage
     */
    setHealthPersentage(persentage) {
        this.percentage = persentage; // => 0...
        let path = this.imagesHealth[this.resolveImgIndex()];
        this.img = this.imageCache[path];
    }
}