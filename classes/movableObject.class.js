class MovableObject {
    x = 120;
    y = 200; // 
    img;
    height = 150;
    width = 80;

    speed = 0.15;
    currentImg = 0;

    imageCache = {};

    otherDirection = false;

    //Gravitation
    speedY = -1;
    acceleration = 2;

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
        console.log('moving right');
    }

    /** Lässt alles mit dem in der Variable "speed" angegebenden Geschwindigkeit nach liks bewegen */
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60)
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
}