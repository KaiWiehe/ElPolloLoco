class SmallChicken extends MovableObject {
    x = 500 + Math.random() * 2000;
    y = 380;
    height = 50;
    width = 50;

    imagesWalking = imagesWalkingSmallChicken();

    // hitbox offset
    offset = {
        top: 5,
        bottom: 10,
        left: 5,
        right: 10
    }

    moveLeftInterval;
    playAnimationInterval;
    jumpInterval;
    WalkRightInterval;
    WalkRightInterval2;

    dead = false;

    alive = true;

    /* #############################################   functions   ############################################# */

    constructor() {
        super().loadImg(this.imagesWalking[0]);
        this.loadImgArray(this.imagesWalking);
        this.animateChicken();
        this.speed = 0.65 + Math.random() * 0.25;
        this.chickenJump(2);
        this.applyGravity();
    }
}