class Chicken extends MovableObject {
    x = 300 + Math.random() * 400;
    y = 380;
    height = 50;
    width = 50;

    imagesWalking = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    /* #############################################   Funktionen   ############################################# */

    constructor() {
        super().loadImg(this.imagesWalking[0]);
        this.loadImgArray(this.imagesWalking);
        this.animate();
        this.speed = 0.15 + Math.random() * 0.25;
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.imagesWalking);
        }, 300)
    }
}