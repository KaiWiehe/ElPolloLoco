class Level {
    enemies;
    clouds;
    background;
    levelEnd = 719 * 4;

    constructor(enemies, clouds, background) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
    }
}