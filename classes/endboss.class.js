class Endboss extends MovableObject {
    x = 2400;
    y = 150;
    height = 300;
    width = 300;

    imagesWalking = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    imagesDead = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    playAnimationInterval;
    dead = false;

    energy = 100;

    /* #############################################   Funktionen   ############################################# */

    constructor() {
        super().loadImg(this.imagesWalking[0]);
        this.loadImgArray(this.imagesWalking);
        this.loadImgArray(this.imagesDead);
        this.animate();
        this.speed = 0.15 + Math.random() * 0.25;
    }

    animate() {
        //this.moveLeft();
        this.playAnimationInterval = setInterval(() => {
            this.playAnimation(this.imagesWalking);
        }, 300)
    }
}