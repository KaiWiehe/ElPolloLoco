class Bottle extends drawableObjects {

    offset = {
        top: 10,
        bottom: 0,
        left: 30,
        right: 30
    }

    bottleLeft = 'assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png';
    bottleRight = 'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'

    constructor() {
        super();
        let number = this.randomNumber(1, 2)
        if (number === 1) {
            this.loadCoinOrBottle(this.bottleLeft, 80, 80);
        } else {
            this.loadCoinOrBottle(this.bottleRight, 80, 80);
        }
    }
}