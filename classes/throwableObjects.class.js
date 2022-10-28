class ThrowableObjects extends MovableObject {

    speedX = 13; // Speed nach rechts/links
    otherDirection2 = false;

    imagesFlying = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    imagesSplash = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    flying = true;
    splash = false;

    broken = false;

    brokenBottleSound = new Audio('assets/audio/brokenBottle.wav');
    throwBottleSound = new Audio('assets/audio/throwBottle.wav');

    constructor(x, y, otherDirection, short) {
        super().loadImg('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImgArray(this.imagesFlying);
        this.loadImgArray(this.imagesSplash);
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.otherDirection2 = otherDirection;
        if (short && !this.otherDirection2) { // Wenn ich nach links gucke wirft er immer nur kurz
            this.speedX -= 7;
        }
        this.animateBottle();
        this.throw();
    }

    throw () {
        this.bottleSounds();
        this.speedY = 15; // speed nach oben
        this.applyGravity();
        if (!this.otherDirection2) { // throw right
            setInterval(() => {
                this.x += this.speedX;
            }, 1000 / 25)
        } else { // throw left
            setInterval(() => {
                this.x -= this.speedX - 5;
            }, 1000 / 25)
        }
    }

    animateBottle() {
        setInterval(() => {
            if (this.flying) {
                this.playAnimation(this.imagesFlying);
            }

            console.log(this.splash);
        }, 70)
        setInterval(() => {
            if (this.splash) {
                this.playAnimation(this.imagesSplash);
            }
        }, 200)
    }

    bottleSounds() {
        if (this.flying) {
            this.throwBottleSound.play();
            this.throwBottleSound.volume = 0.2;
        }
        console.log(this.splash);
        if (this.splash) {
            this.brokenBottleSound.play();
            this.brokenBottleSound.volume = 0.1;
        }

    }
}