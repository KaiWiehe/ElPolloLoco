class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud(),
    ];
    background = [
        new Background('assets/img/5_background/layers/air.png'),
        new Background('assets/img/5_background/layers/3_third_layer/1.png'),
        new Background('assets/img/5_background/layers/2_second_layer/1.png'),
        new Background('assets/img/5_background/layers/1_first_layer/1.png'),
    ];

    /* ########################################################################################################## */

    canvas;
    ctx;

    /* #############################################   Funktionen   ############################################# */

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        //leert den canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        /** Background
         * zeigt den Background an*/
        this.addArrayToMap(this.background);

        /** Character
         * zeigt den Character an*/
        this.addObjectToMap(this.character)

        /**Enemies
         * geht mit einer for schleife durch alle enemies und zeigt sie an*/
        this.addArrayToMap(this.enemies);

        /**Clouds
         * geht mit einer for schleife durch alle clouds und zeigt sie an*/
        this.addArrayToMap(this.clouds);

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
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
    }
}