class StatBarBottle extends drawableObjects {
    imagesBottle = [
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    percentage = 100;

    /* #############################################   Funktionen   ############################################# */

    constructor() {
        super().loadImgArray(this.imagesBottle);
        this.setBottlePersentage(0);
        this.x = 10;
        this.y = 80;
        this.width = 200;
        this.height = 50;
    }

    //setHealthPersentage(50);
    setBottlePersentage(persentage) {
        this.percentage = persentage; // => 0...
        let path = this.imagesBottle[this.resolveImgIndex()];
        this.img = this.imageCache[path];
    }
}