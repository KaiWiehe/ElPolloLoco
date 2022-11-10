class Endboss extends MovableObject {
    x = 2400; // 2400
    y = 150;
    height = 300;
    width = 300;

    imagesAlert = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    imagesWalking = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    imagesAttack = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    imagesHurt = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    imagesDead = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    offset = {
        top: 60,
        bottom: 30,
        left: 40,
        right: 40
    }

    animationInterval

    energy = 100;

    world;

    attackIntervalActive = false;
    walkingIntervalActive = false;
    alertIntervalActive = false;
    hurtIntervalActive = false;

    speed = 2; //2

    endbossAttackSound = new Audio('assets/audio/endbossAttack.wav');
    playEndbossAttackSound = false;

    /* #############################################   Funktionen   ############################################# */

    constructor() {
        super().loadImg(this.imagesWalking[0]);
        this.loadImgArray(this.imagesAlert);
        this.loadImgArray(this.imagesWalking);
        this.loadImgArray(this.imagesAttack);
        this.loadImgArray(this.imagesHurt);
        this.loadImgArray(this.imagesDead);
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

    animations() {
        this.animationInterval = setInterval(() => {
            if (this.attackIntervalActive) {
                this.playAnimation(this.imagesAttack);
            }
            if (this.walkingIntervalActive) {
                this.playAnimation(this.imagesWalking);
            }
        }, 300)
        setInterval(() => {
            if (this.hurtIntervalActive) {
                if (this.currentImgEndbossHurt <= 2) {
                    this.playAnimationEndbossHurt(this.imagesHurt);
                } else {
                    this.currentImgEndbossHurt = 0;
                    this.hurtIntervalActive = false;
                }
            }
        }, 200);
    }

    alert() {
        this.playAlertInterval = setInterval(() => {
            this.playAnimation(this.imagesAlert);
        }, 300)
        this.alertIntervalActive = true;
    }

    stopAlert() {
        setTimeout(() => { // sonst kommt manchmal ein error, weil der character noch nicht fertig geladen ist
            setInterval(() => {
                if (this.world.character.x >= 2000) {
                    this.playEndbossAttackSound = true;
                }
                if (this.world.character.x >= 2000) {
                    clearInterval(this.playAlertInterval);
                    this.alertIntervalActive = false; // damit er losläuft
                    if (this.playEndbossAttackSound && play) {
                        this.endbossAttackSound.play();
                        this.endbossAttackSound.volume = 0.3;
                        this.playEndbossAttackSound = false;
                    }
                }
            }, 100);
        }, 2000);
    }
}