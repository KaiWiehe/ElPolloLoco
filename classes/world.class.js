class World {
    character = new Character();
    level = level1;
    statBarHealth = new StatBarHealth();
    statBarCoin = new StatBarCoin();
    statBarBottle = new StatBarBottle();
    statBarEndboss = new StatBarEndboss();
    throwableObjects = [];
    checkCollosion = new CheckCollosion(this);

    /* ################################################*/

    canvas;
    ctx;
    keyboard;
    cameraX = 0;

    coinCounter = 0;
    bottleCounter = 0;

    /* #############################################   functions   ############################################# */

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); // makes the canvas a 2d map and adds it to the variable ctx
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
        this.level.endboss[0].world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0); // is there for the camera to move and not the character
        this.addMovableObjects();
        this.addFixedObjects();
        this.ctx.translate(-this.cameraX, 0); // is there for the camera to move and not the character
        this.reloadDrawFunction();
    }

    /**
     * Goes through the array with a loop and passes it to the addObjectToMap() function
     * Only if it's an array
     * @param {objects} objects // z.b this.clouds
     */
    addArrayToMap(objects) {
        objects.forEach((object) => this.addObjectToMap(object));
    }

    /**
     * Adds the object to the canvas
     * This function only works for individual objects
     * @param {object} object // z.b. this.character
     */
    addObjectToMap(object) {
        // if char moves to the left, the image is mirrored
        this.isWalkingLeft(object) && this.flipImg(object);
        object.draw(this.ctx);
        //object.drawFrame(this.ctx); // if I want a frame / hitbox around the element
        this.isWalkingLeft(object) && this.flipImgBack(object);
    }

    isWalkingLeft(object) {
        return object.otherDirection;
    }

    flipImg(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    flipImgBack(object) {
        this.ctx.restore();
        object.x = object.x * -1;
    }

    addFixedObjects() {
        this.ctx.translate(-this.cameraX, 0);
        //--------------Space for fix Objects-------
        this.addObjectToMap(this.statBarHealth);
        this.addObjectToMap(this.statBarCoin);
        this.addObjectToMap(this.statBarBottle);
        this.addObjectToMap(this.statBarEndboss);
        //--------------End------------------------
        this.ctx.translate(this.cameraX, 0);
    }

    addMovableObjects() {
        this.addArrayToMap(this.level.background);
        this.addObjectToMap(this.character);
        this.addArrayToMap(this.level.bottle);
        this.addArrayToMap(this.level.chickens);
        this.addArrayToMap(this.level.endboss);
        this.addArrayToMap(this.level.clouds);
        this.addArrayToMap(this.level.coin);
        this.addArrayToMap(this.throwableObjects);
    }

    reloadDrawFunction() {
        //reloads the function
        let self = this;
        requestAnimationFrame(() => self.draw());
    }
}