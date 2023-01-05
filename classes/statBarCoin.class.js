class StatBarCoin extends drawableObjects {
    imagesCoin = [
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];
    percentage = 100;

    /* #############################################   Funktionen   ############################################# */

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