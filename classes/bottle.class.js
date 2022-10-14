class Bottle extends drawableObjects {

    offset = {
        top: 10,
        bottom: 0,
        left: 30,
        right: 30
    }

    constructor() {
        super().loadCoinOrBottle('assets/img/6_salsa_bottle/salsa_bottle.png', 80, 80);
    }
}