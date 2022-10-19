class ThrowableObjects extends MovableObject {

    speedX = 13; // Speed nach rechts/links
    otherDirection2 = false;

    imagesFlying = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    constructor(x, y, otherDirection, short) {
        super().loadImg('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImgArray(this.imagesFlying);
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
            this.playAnimation(this.imagesFlying);
        }, 70)
    }
}