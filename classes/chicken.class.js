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

    offset = {
        top: 5,
        bottom: 10,
        left: 5,
        right: 10
    }

    /* #############################################   Funktionen   ############################################# */

    constructor() {
        super().loadImg(this.imagesWalking[0]);
        this.loadImgArray(this.imagesWalking);
        this.animate();
        //this.speed = 0.15 + Math.random() * 0.25; TODO
    }
    speed = 0; //TODO

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
        setInterval(() => {
            this.playAnimation(this.imagesWalking);
        }, 300)
    }
}