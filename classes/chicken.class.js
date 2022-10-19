class Chicken extends MovableObject {
    x = 300 + Math.random() * 2000;
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

    moveLeftInterval;
    playAnimationInterval;

    dead = false;

    /* #############################################   Funktionen   ############################################# */

    constructor() {
        super().loadImg(this.imagesWalking[0]);
        this.loadImgArray(this.imagesWalking);
        this.animate();
        this.speed = 0.15 + Math.random() * 0.25;
    }

    animate() {
        this.moveLeftInterval = setInterval(() => {
            if (play) {
                this.moveLeft();
            }
        }, 1000 / 60)
        this.playAnimationInterval = setInterval(() => {
            this.playAnimation(this.imagesWalking);
        }, 300)
    }
}