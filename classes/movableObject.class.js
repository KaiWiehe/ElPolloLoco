class MovableObject {
    x = 120;
    y = 270;
    img;
    height = 150;
    width = 80;

    speed = 0.15;
    energy = 100;
    damage = 5;

    currentImg = 0;
    currentImgJumping = 0;

    imageCache = {};

    otherDirection = false;

    //Gravitation
    speedY = 0;
    acceleration = 2;

    // der Rahmen um den Enemy, nicht der Rahmen um das Bild
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    lastHit = 0;

    /* #############################################   Funktionen   ############################################# */

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImgArray(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        this.x += this.speed;
    }

    /** Lässt alles mit dem in der Variable "speed" angegebenden Geschwindigkeit nach liks bewegen */
    moveLeft() {
        this.x -= this.speed;
    }

    // Wenn ich laufe und springe gleichzeitig kommt er mit der CurrentImg Zahl durcheinander 
    // deshalb habe ich das in zwei Funktionen aufgeteilt 
    playAnimationJumping(images) { // TODO Kann ich bestimmt irgendwie in einer Funktion zusammenfassen
        let i = this.currentImgJumping % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImgJumping++;
    }

    playAnimation(images) {
        let i = this.currentImg % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImg++;
    }

    //Gravitation
    applyGravity() {
        setInterval(() => {
            // Entweder PEPE ist über dem Boden oder ich habe die Sprung Taste gedückt, dadurch hat sich der this.speedY Wert hat sich erhöht
            if (this.isCharacterInAir() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (this.y >= 266) {
                this.speedY = 0
            } //Wenn er auf dem Boden ist setzt sich der wert wieder zurück
        }, 1000 / 25)
    }

    isCharacterInAir() {
        return this.y < 265;
    }

    jump() {
        this.speedY = 25; //Sprunghöhe
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) { // zeigt den Ramen nur beim Character und beim Chicken an
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            // Zeichnet den Offset
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - (this.offset.right + this.offset.left), this.height - (this.offset.bottom + this.offset.top));
            ctx.stroke();
        }
    }

    isColliding(obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left && // Character.right || Enemy.left
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top && // Character.top || Enemy.bottom
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right && // Character.left || Enemy.right
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom // Character.bottom || Enemy.top
    }

    hit() {
        this.energy -= this.damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; //difference in s
        return timepassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }
}