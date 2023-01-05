const level1 = new Level(
    createChickensAndSmallChickens(),
    createCloudsAndBarbedWire(),
    createBackground(),
    createCoins(),
    createBottles(), [new Endboss(this)]
);

function createChickensAndSmallChickens() {
    return [
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
    ];
}

function createCloudsAndBarbedWire() {
    return [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new BarbedWire(),
    ];
}

function createBackground() {
    return [
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
    ];
}

function createCoins() {
    return [
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
    ];
}

function createBottles() {
    return [
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
    ];
}