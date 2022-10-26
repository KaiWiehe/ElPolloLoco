const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
    ], [
        new Cloud(),
        new BarbedWire(),
    ], [
        new Background('assets/img/5_background/layers/air.png', -719, 0),
        new Background('assets/img/5_background/layers/3_third_layer/2.png', -719, 0),
        new Background('assets/img/5_background/layers/2_second_layer/2.png', -719, 0),
        new Background('assets/img/5_background/layers/1_first_layer/2.png', -719, 0),
        //########################
        new Background('assets/img/5_background/layers/air.png', 0, 0),
        new Background('assets/img/5_background/layers/3_third_layer/1.png', 0, 0),
        new Background('assets/img/5_background/layers/2_second_layer/1.png', 0, 0),
        new Background('assets/img/5_background/layers/1_first_layer/1.png', 0, 0),
        //#######################
        new Background('assets/img/5_background/layers/air.png', 719, 0),
        new Background('assets/img/5_background/layers/3_third_layer/2.png', 719, 0),
        new Background('assets/img/5_background/layers/2_second_layer/2.png', 719, 0),
        new Background('assets/img/5_background/layers/1_first_layer/2.png', 719, 0),
        //#######################
        new Background('assets/img/5_background/layers/air.png', 719 * 2, 0),
        new Background('assets/img/5_background/layers/3_third_layer/1.png', 719 * 2, 0),
        new Background('assets/img/5_background/layers/2_second_layer/1.png', 719 * 2, 0),
        new Background('assets/img/5_background/layers/1_first_layer/1.png', 719 * 2, 0),
        //#######################
        new Background('assets/img/5_background/layers/air.png', 719 * 3, 0),
        new Background('assets/img/5_background/layers/3_third_layer/2.png', 719 * 3, 0),
        new Background('assets/img/5_background/layers/2_second_layer/2.png', 719 * 3, 0),
        new Background('assets/img/5_background/layers/1_first_layer/2.png', 719 * 3, 0),
        //#######################
        new Background('assets/img/5_background/layers/air.png', 719 * 4, 0),
        new Background('assets/img/5_background/layers/3_third_layer/1.png', 719 * 4, 0),
        new Background('assets/img/5_background/layers/2_second_layer/1.png', 719 * 4, 0),
        new Background('assets/img/5_background/layers/1_first_layer/1.png', 719 * 4, 0),
    ], [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
    ], [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
    ], [
        new Endboss(this)
    ]
);