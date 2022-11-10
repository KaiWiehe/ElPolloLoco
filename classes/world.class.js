class World {
    character = new Character();
    level = level1;
    statBarHealth = new StatBarHealth();
    statBarCoin = new StatBarCoin();
    statBarBottle = new StatBarBottle();
    statBarEndboss = new StatBarEndboss();
    throwableObjects = [];
    checkCollosion = new CheckCollosion(this);

    /* ########################################################################################################## */

    canvas;
    ctx;
    keyboard;
    cameraX = 0;

    coinCounter = 0;
    bottleCounter = 0;



    /* #############################################   Funktionen   ############################################# */

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); // macht den canvas zu einer 2d Karte und fügt sie der variable ctx zu
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    // Damit im Character die Variable World genau das hier ist
    setWorld() {
        this.character.world = this;
        this.level.endboss[0].world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //leert den canvas
        this.ctx.translate(this.cameraX, 0); // ist dafür da das sich die Kamera bewegt und nicht der Character
        this.addMovableObjects();
        this.addFixedObjects();
        this.ctx.translate(-this.cameraX, 0); // ist dafür da das sich die Kamera bewegt und nicht der Character  
        this.reloadDrawFunction();
    }

    /**
     * Geht mit einer For Schleife durch das Array und gibt es an die addObjectToMap() funktion weiter
     * Nur wenn es ein Array ist
     * sonst muss ich addObjectToMap() nehmen 
     * @param {objects} objects // z.b this.clouds
     */
    addArrayToMap(objects) {
        objects.forEach(object => {
            this.addObjectToMap(object);
        })
    }

    /**
     * Fügt das Objekt zu den Canvas hinzu
     * Wenn es ein Array ist muss ich addArrayToMap() nehmen
     * Diese funktion nur bei einzelnen Objekten
     * @param {object} object // z.b. this.character
     */
    addObjectToMap(object) {
        // wenn PEPE nach links läuft spiegelt sich das Bild
        // weil der Charakter das einzige Element ist das kein Array ist, wird nur er gespiegelt 
        if (this.isWalkingLeft(object)) {
            this.flipImg(object);
        }
        object.draw(this.ctx);
        //object.drawFrame(this.ctx);
        if (this.isWalkingLeft(object)) {
            this.flipImgBack(object);
        }
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
        //------------------------Space for fix Objects------------------------
        this.addObjectToMap(this.statBarHealth);
        this.addObjectToMap(this.statBarCoin);
        this.addObjectToMap(this.statBarBottle);
        this.addObjectToMap(this.statBarEndboss);
        //------------------------End------------------------
        this.ctx.translate(this.cameraX, 0);
    }

    addMovableObjects() {
        this.addArrayToMap(this.level.background);
        this.addObjectToMap(this.character)
        this.addArrayToMap(this.level.bottle);
        this.addArrayToMap(this.level.chickens);
        this.addArrayToMap(this.level.endboss);
        this.addArrayToMap(this.level.clouds);
        this.addArrayToMap(this.level.coin);
        this.addArrayToMap(this.throwableObjects);
    }

    reloadDrawFunction() {
        //lädt die funktion neu
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        })
    }
}