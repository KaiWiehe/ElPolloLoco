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

    // der Rahmen um den Enemy, nicht der Rahmen um das Bild
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };

    /* #############################################   Funktionen   ############################################# */

    /**
     * @param {string} path
     */
    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * @param {array} arr
     */
    loadImgArray(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

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
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

    loadCoinOrBottle(path, width, height, coinOrBottle) {
        this.loadImg(path);
        this.x = 400 + Math.random() * 1800; // von x300 bis xZufällig werden die sachen platziert
        coinOrBottle === 'coin' ? (this.y = 80 + Math.random() * 250) : (this.y = 350);
        this.width = width;
        this.height = height;
    }

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}