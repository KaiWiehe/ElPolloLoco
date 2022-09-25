class Chicken extends MovableObject {

    x = 300 + Math.random() * 400;
    y = 360;
    height = 50;
    width = 50;

    /* #############################################   Funktionen   ############################################# */

    constructor() {
        super().loadImg('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    }
}