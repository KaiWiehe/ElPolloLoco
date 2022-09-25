class MovableObject {
    x = 120;
    y = 265;
    img;
    height = 150;
    width = 80;

    speed = 0.15;
    currentImg = 0;

    imageCache = {};

    otherDirection = false;

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
}