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

    /** Makes everything move left at the speed specified in the "speed" variable */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * @param {array} images - array with a list of paths to the IMG's
     */
    playAnimationJumping(images) {
        let i = this.currentImgJumping % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImgJumping++;
    }

    /**
     * @param {array} images - array with a list of paths to the IMG's
     */
    playAnimation(images) {
        let i = this.currentImg % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImg++;
    }

    /**
     * @param {array} images - array with a list of paths to the IMG's
     */
    playAnimationEndbossDead(images) {
        let i = this.currentImgEndbossDead % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImgEndbossDead++;
    }

    /**
     * @param {array} images - array with a list of paths to the IMG's
     */
    playAnimationEndbossHurt(images) {
        let i = this.currentImgEndbossHurt % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImgEndbossHurt++;
    }

    applyGravity() {
        setInterval(() => {
            this.gravityCharacterAndThrowableObjects();
            this.gravityChickenAndSmallChicken();
        }, 1000 / 25);
    }

    gravityCharacterAndThrowableObjects() {
        if (this instanceof Character || this instanceof ThrowableObjects) {
            if (this.isCharacterInAir(265) || this.speedY > 0) this.jumpOrFall();
            !(this instanceof ThrowableObjects) && this.y >= 266 && (this.speedY = 0);
            //When he's on the ground, the value resets
        }
    }

    gravityChickenAndSmallChicken() {
        if (this instanceof Chicken || this instanceof SmallChicken) {
            if (this.isCharacterInAir(380) || this.speedY > 0) this.jumpOrFall();
            this.y >= 380 && (this.speedY = 0);
        }
    }

    jumpOrFall() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }

    /**
     * @param {number} number - Y coordinate
     * @returns boolean
     */
    isCharacterInAir(number) {
        if (this instanceof ThrowableObjects) {
            return true;
        } else {
            return this.y < number;
        }
    }

    /**
     * @param {number} jumpHeight
     */
    jump(jumpHeight) {
        this.speedY = jumpHeight;
    }

    isColliding(obj) {
        return (
            this.x + this.width - this.offset.right > obj.x + obj.offset.left && // Character.right || Enemy.left
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top && // Character.top || Enemy.bottom
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right && // Character.left || Enemy.right
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
        ); // Character.bottom || Enemy.top
    }

    /**
     * @example
     * this.energy -= damage;
     * @param {number} damage
     */
    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     *  so that you can only be hit every 0.5 s
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; //difference in s
        return timepassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }

    /**
     * @param {number} jumpProbability - bigger than 1
     */
    chickenJump(jumpProbability) {
        let allowJump = false;
        this.jumpInterval = setInterval(() => {
            if (this.y === 380) {
                // so the chicken doesn't jump twice in a row
                let i = this.randomNumber(1, jumpProbability);
                i === 1 && (allowJump = true);
                allowJump && this.jump(18);
                allowJump = false;
            }
        }, 500);
    }

    animateChicken() {
        let moveLeft = true;
        this.moveLeftInterval = setInterval(() => this.moveLeftOrRight(moveLeft), 1000 / 60);
        this.playAnimationInterval = setInterval(() => this.playAnimation(this.imagesWalking), 300);
        setInterval(() => {
            let i = this.randomNumber(1, 3);
            i === 1 ? (moveLeft = false) : (moveLeft = true); //runs to Right / left
        }, 5000);
    }

    /**
     * true = moveLeft.
     * false = moveRight.
     * @param {boolean} moveLeft
     */
    moveLeftOrRight(moveLeft) {
        if (play && moveLeft)(this.otherDirection = false), this.moveLeft();
        else if (play)(this.otherDirection = true), this.moveRight();
    }
}