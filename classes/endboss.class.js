class Endboss extends MovableObject {
    x = 2400; // 2400
    y = 150;
    height = 300;
    width = 300;

    //images
    imagesAlert = imagesAlertEndboss();
    imagesWalking = imagesWalkingEndboss();
    imagesAttack = imagesAttackEndboss();
    imagesHurt = imagesHurtEndboss();
    imagesDead = imagesDeadEndboss();
    imageArray = [this.imagesAlert, this.imagesWalking, this.imagesAttack, this.imagesHurt, this.imagesDead];
    //images end
    // hitbox offset
    offset = {
        top: 60,
        bottom: 30,
        left: 40,
        right: 40,
    };

    animationInterval;

    energy = 100;

    world;

    attackIntervalActive = false;
    walkingIntervalActive = false;
    alertIntervalActive = false;
    hurtIntervalActive = false;

    //low number = slow speed
    //high number = fast speed
    speed = 2; //2

    endbossAttackSound = new Audio('assets/audio/endbossAttack.wav');
    playEndbossAttackSound = false;

    /* #############################################   functions   ############################################# */

    constructor() {
        super().loadImg(this.imagesWalking[0]);
        this.loadImages(this.imageArray)
        this.alert();
        this.stopAlert();
        this.animations();
    }

    stopAllIntervals() {
        this.attackIntervalActive = false;
        this.walkingIntervalActive = false;
        this.alertIntervalActive = false;
        this.hurtIntervalActive = false;
    }

    /**
     * start the animations intervals
     */
    animations() {
        this.walkingAndAttackAnimation();
        this.hurtAnimation();
    }

    /**
     * start the walking and attack animation interval
     */
    walkingAndAttackAnimation() {
        this.animationInterval = setInterval(() => {
            this.attackIntervalActive && this.playAnimation(this.imagesAttack);
            this.walkingIntervalActive && this.playAnimation(this.imagesWalking);
        }, 300);
    }

    /**
     * start the hurt animation interval
     */
    hurtAnimation() {
        setInterval(() => {
            if (this.hurtIntervalActive) {
                this.currentImgEndbossHurt <= 2 ? this.playAnimationEndbossHurt(this.imagesHurt) : ((this.currentImgEndbossHurt = 0), (this.hurtIntervalActive = false));
            }
        }, 200);
    }

    alert() {
        this.playAlertInterval = setInterval(() => this.playAnimation(this.imagesAlert), 300);
        this.alertIntervalActive = true;
    }

    stopAlert() {
        setInterval(() => {
            this.world && this.world.character.x >= 2000 && (this.playEndbossAttackSound = true);
            if (this.world && this.world.character.x >= 2000) {
                clearInterval(this.playAlertInterval);
                this.alertIntervalActive = false;
                if (this.playEndbossAttackSound && play) {
                    this.endbossAttackSound.play();
                    this.endbossAttackSound.volume = 0.3;
                    this.playEndbossAttackSound = false;
                }
            }
        }, 100);
    }
}