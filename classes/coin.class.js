class Coin extends drawableObjects {
    // hitbox offset
    offset = {
        top: 55,
        bottom: 55,
        left: 55,
        right: 55
    }

    /* #############################################   functions   ############################################# */

    constructor() {
        super().loadCoinOrBottle('assets/img/8_coin/coin_1.png', 150, 150, 'coin');
    }
}