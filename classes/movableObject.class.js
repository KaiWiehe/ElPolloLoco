class MovableObject extends drawableObjects {
    speed = 0.15;
    energy = 100;

    otherDirection = false;

    //Gravitation
    speedY = 0;
    acceleration = 2;

    lastHit = 0;

    /* #############################################   Funktionen   ############################################# */

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


    playAnimationEndbossDead(images) {
        let i = this.currentImgEndbossDead % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImgEndbossDead++;
    }

    playAnimationEndbossHurt(images) {
        let i = this.currentImgEndbossHurt % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImgEndbossHurt++;
    }

    //Gravitation
    applyGravity() {
        setInterval(() => {
            // Entweder PEPE ist über dem Boden oder ich habe die Sprung Taste gedückt, dadurch hat sich der this.speedY Wert hat sich erhöht
            if ((this instanceof Character) || (this instanceof ThrowableObjects)) {
                if (this.isCharacterInAir(265) || this.speedY > 0) {
                    this.jumpOrFall();
                }
                if (!(this instanceof ThrowableObjects) && this.y >= 266) {
                    this.speedY = 0
                } //Wenn er auf dem Boden ist setzt sich der wert wieder zurück
            }
            if ((this instanceof Chicken) || (this instanceof SmallChicken)) {
                if (this.isCharacterInAir(380) || this.speedY > 0) {
                    this.jumpOrFall();
                }
                if (this.y >= 380) {
                    this.speedY = 0
                }
            }
        }, 1000 / 25)
    }

    jumpOrFall() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }

    isCharacterInAir(number) {
        if (this instanceof ThrowableObjects) {
            return true;
        } else {
            return this.y < number;
        }
    }

    jump(jumpHeight) {
        this.speedY = jumpHeight; //Sprunghöhe
    }

    isColliding(obj) {
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left && // Character.right || Enemy.left
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top && // Character.top || Enemy.bottom
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right && // Character.left || Enemy.right
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom // Character.bottom || Enemy.top
    }

    // Der Damage wird der Energy abgezogen
    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    // ist für die Animation, Ist dafür da wie lange die Animation spielen soll
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; //difference in s
        return timepassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }

    chickenJump(jumpProbability) {
        let allowJump = false;
        this.jumpInterval = setInterval(() => {
            if (this.y === 380) { // damit das Huhn nicht zwei mal hintereinander springt
                let i = this.randomNumber(1, jumpProbability);
                if (i === 1) {
                    allowJump = true;
                }
                if (allowJump) {
                    this.jump(18);
                }
                allowJump = false;
            }
        }, 500);
    }

    animateChicken() {
        let moveLeft = true;
        this.moveLeftInterval = setInterval(() => {
            this.moveLeftOrRight(moveLeft);
        }, 1000 / 60)
        this.playAnimationInterval = setInterval(() => {
            this.playAnimation(this.imagesWalking);
        }, 300)
        setInterval(() => {
            let i = this.randomNumber(1, 3);
            if (i === 1) {
                moveLeft = false; //läuft nach rechts
            } else {
                moveLeft = true; //läuft nach links
            }
        }, 5000);
    }

    moveLeftOrRight(moveLeft) {
        if (play && moveLeft) {
            this.otherDirection = false;
            this.moveLeft();
        } else if (play) {
            this.otherDirection = true;
            this.moveRight();
        }
    }
}