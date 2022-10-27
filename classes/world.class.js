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
        //leert den canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // ist dafür da das sich die Kamera bewegt und nicht der Character
        this.ctx.translate(this.cameraX, 0);
        /** Background
         * zeigt den Background an*/
        this.addArrayToMap(this.level.background);

        /** Character
         * zeigt den Character an*/
        this.addObjectToMap(this.character)

        /** bottle
         * zeigt den bottle an*/
        this.addArrayToMap(this.level.bottle);

        /**chickens
         * geht mit einer for schleife durch alle chickens und zeigt sie an*/
        this.addArrayToMap(this.level.chickens);

        /**endboss
         * geht mit einer for schleife durch alle endboss und zeigt sie an*/
        this.addArrayToMap(this.level.endboss);

        /**Clouds
         * geht mit einer for schleife durch alle clouds und zeigt sie an*/
        this.addArrayToMap(this.level.clouds);

        /** Coin
         * zeigt den Coin an*/
        this.addArrayToMap(this.level.coin);

        /** bottle
         * zeigt den bottle an*/
        this.addArrayToMap(this.throwableObjects);


        this.ctx.translate(-this.cameraX, 0);
        //------------------------Space for fix Objects------------------------
        /** StatBarHealth
         * zeigt den StatBar an*/
        this.addObjectToMap(this.statBarHealth);

        /** StatBarCoin
         * zeigt den StatBar an*/
        this.addObjectToMap(this.statBarCoin);

        /** StatBarBottle
         * zeigt den StatBar an*/
        this.addObjectToMap(this.statBarBottle);

        /** StatBarEndboss
         * zeigt den StatBar an*/
        this.addObjectToMap(this.statBarEndboss);
        //------------------------End------------------------
        this.ctx.translate(this.cameraX, 0);

        // ist dafür da das sich die Kamera bewegt und nicht der Character  
        this.ctx.translate(-this.cameraX, 0);

        //lädt die funktion neu
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        })
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
}