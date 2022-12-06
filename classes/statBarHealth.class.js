class StatBarHealth extends drawableObjects {
    imagesHealth = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];
    percentage = 100;

    /* #############################################   Funktionen   ############################################# */

    constructor() {
        //backgroundPath, x, y, width, heightTODO
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