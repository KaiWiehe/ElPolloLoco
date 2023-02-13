class BarbedWire extends drawableObjects {
    x = -100;
    y = 250;
    width = 300;
    height = 200;

    /* #############################################   functions   ############################################# */

    /** sets the correct image */
    constructor() {
        super().loadImg('assets/img/bg/barbed_wire.png');
    }
}