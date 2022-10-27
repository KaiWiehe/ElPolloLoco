class StatBarEndboss extends drawableObjects {
    imagesEndbossBar = [
        'assets/img/7_statusbars/2_statusbar_endboss/blue0.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue80.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue100.png',
    ];
    percentage = 100;

    /* #############################################   Funktionen   ############################################# */

    constructor() {
        super().loadImgArray(this.imagesEndbossBar);
        this.setEndbossPersentage(100);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 50;
    }

    //setHealthPersentage(50);
    setEndbossPersentage(persentage) {
        this.percentage = persentage; // => 0...
        let path = this.imagesEndbossBar[this.resolveImgIndex()];
        this.img = this.imageCache[path];
    }
}