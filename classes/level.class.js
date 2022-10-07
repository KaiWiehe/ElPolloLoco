class Level {
    enemies;
    clouds;
    background;
    coin;
    bottle;

    levelEnd = 719 * 4;

    constructor(enemies, clouds, background, coin, bottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
        this.coin = coin;
        this.bottle = bottle;
    }
}