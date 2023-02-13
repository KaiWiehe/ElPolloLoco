class Level {
    chickens;
    clouds;
    background;
    coin;
    bottle;
    endboss;

    levelEnd = 719 * 4;

    /* #############################################   functions   ############################################# */

    constructor(chickens, clouds, background, coin, bottle, endboss) {
        this.chickens = chickens;
        this.clouds = clouds;
        this.background = background;
        this.coin = coin;
        this.bottle = bottle;
        this.endboss = endboss;
    }
}