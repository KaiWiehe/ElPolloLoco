class World {
    character = new Character();
    level = level1;

    /* ########################################################################################################## */

    canvas; // variable canvas
    ctx; //variable ctx
    keyboard; //variable keyboard
    cameraX = 0;

    /* #############################################   Funktionen   ############################################# */

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); // macht den canvas zu einer 2d Karte und fügt sie der variable ctx zu
        this.canvas = canvas; // Definiert den canvas in der variable canvas
        this.keyboard = keyboard; // Definiert den keyboard in der variable keyboard
        this.draw(); // startet die Funktion Draw()
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        //leert den canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.cameraX, 0);

        /** Background
         * zeigt den Background an*/
        this.addArrayToMap(this.level.background);

        /** Character
         * zeigt den Character an*/
        this.addObjectToMap(this.character)

        /**Enemies
         * geht mit einer for schleife durch alle enemies und zeigt sie an*/
        this.addArrayToMap(this.level.enemies);

        /**Clouds
         * geht mit einer for schleife durch alle clouds und zeigt sie an*/
        this.addArrayToMap(this.level.clouds);

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
        if (object.otherDirection) {
            this.ctx.save();
            this.ctx.translate(object.width, 0);
            this.ctx.scale(-1, 1);
            object.x = object.x * -1;
        }
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
        if (object.otherDirection) {
            this.ctx.restore();
            object.x = object.x * -1;
        }
    }
}