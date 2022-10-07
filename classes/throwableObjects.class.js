class ThrowableObjects extends MovableObject {

    speedX = 15;

    constructor(x, y) {
        super().loadImg('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.throw();
    }

    throw () {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += this.speedX;
        }, 1000 / 25)
    }
}