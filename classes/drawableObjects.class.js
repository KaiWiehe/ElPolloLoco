class drawableObjects {
    x = 300;
    y = 270;
    img;
    height = 150;
    width = 80;

    currentImg = 0;
    currentImgJumping = 0;
    currentImgEndbossDead = 0;
    currentImgEndbossHurt = 0;
    currentImgBottle = 0;

    imageCache = {};

    world;

    // hitbox offset
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };

    /* #############################################   functions   ############################################# */

    /**
     * @param {string} path - an img path
     */
    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * @param {array} arr - an array with img paths
     */
    loadImgArray(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * @param {canvas} ctx
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * @param {canvas} ctx
     */
    drawFrame(ctx) {
        if (this.canDrawFrame()) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            // Draws the offset
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - (this.offset.right + this.offset.left), this.height - (this.offset.bottom + this.offset.top));
            ctx.stroke();
        }
    }

    canDrawFrame() {
        return (
            this instanceof Character ||
            this instanceof Chicken ||
            this instanceof Endboss ||
            this instanceof Coin ||
            this instanceof Bottle ||
            this instanceof ThrowableObjects ||
            this instanceof SmallChicken ||
            this instanceof BarbedWire
        );
    }

    resolveImgIndex() {
        if (this.percentage == 100) return 5
        else if (this.percentage >= 80) return 4
        else if (this.percentage >= 60) return 3
        else if (this.percentage >= 40) return 2
        else if (this.percentage >= 20) return 1
        else return 0
    }

    /**
     * @param {string} path
     * @param {class} coinOrBottle
     */
    loadCoinOrBottle(path, width, height, coinOrBottle) {
        this.loadImg(path);
        this.x = 400 + Math.random() * 1800; // von x300 bis xZufällig werden die sachen platziert
        coinOrBottle === 'coin' ? (this.y = 80 + Math.random() * 250) : (this.y = 350);
        this.width = width;
        this.height = height;
    }

    /**
     * @example
     * randomNumber(1, 3)
     * // return 1 or 2 or 3
     * @param {number} min
     * @param {number} max
     */
    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /**
     * to execute this one line with each subarray 
     * if you have more than one imgArray
     * @param {Array} arr - an array filled with arrays - for example: [this.imagesWalking, this.imagesAttack];
     */
    loadImages(arr) {
        arr.forEach(el => {
            this.loadImgArray(el);
        });
    }
}