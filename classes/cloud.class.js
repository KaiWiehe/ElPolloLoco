class Cloud extends MovableObject {
    x = Math.random() * 2400;
    y = 20;
    width = 500;
    height = 300;

    /* #############################################   functions   ############################################# */

    constructor() {
        super().loadImg('assets/img/5_background/layers/4_clouds/1.png');
        this.animate();
    }

    /** Makes the clouds slowly move to the left */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}