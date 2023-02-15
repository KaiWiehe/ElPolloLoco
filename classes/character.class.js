class Character extends MovableObject {
    //images
    imagesWalking = imagesWalkingCharacter();
    imagesJumping = imagesJumpingCharacter();
    imagesDead = imagesDeadCharacter();
    imagesHit = imagesHitCharacter();
    imagesIdle = imagesIdleCharacter();
    imagesLongIdle = imagesLongIdleCharacter();
    imageArray = [this.imagesWalking, this.imagesJumping, this.imagesDead, this.imagesHit, this.imagesIdle, this.imagesLongIdle]
        //images end

    //sounds
    walkingSound = new Audio('assets/audio/running.wav');
    hitSound = new Audio('assets/audio/hit.wav');
    jumpingSound = new Audio('assets/audio/jump.wav');
    dieSound = new Audio('assets/audio/die.m4a');
    snoreSound = new Audio('assets/audio/snore.mp3');

    //varables for sounds
    playWalkingSound = false;
    playhitSound = false;
    playjumpingSound = false;
    playdieSound = false;
    playsnoreSound = false;
    //sounds end

    //low number = slow speed
    //high number = fast speed
    speed = 3;

    //the hitbox offset
    offset = {
        top: 60,
        bottom: 5,
        left: 15,
        right: 20,
    };


    bottleShortOrLong;

    timeout = false;
    gameover = false;

    idleCounter = 0;

    /* #############################################   functions   ############################################# */

    constructor() {
        super().loadImg(this.imagesWalking[0]);
        this.loadImages(this.imageArray)
        this.animate();
        this.applyGravity();
    }

    /** start the intervals */
    animate() {
        this.characterMovementAndSounds();
        this.shotInterval();
        this.animationAndSoundsInterval();
    }

    /** movement and sound interval */
    characterMovementAndSounds() {
        setInterval(() => {
            play && (this.CharMovementAndSounds(), this.setCamera());
        }, 1000 / 60);
    }

    /**
     * do i press the "right" key and is x less than the level end?
     */
    allowToMoveRight() {
        return this.world.keyboard.right && this.x < this.world.level.levelEnd;
    }

    /**
     * do i press the "left" key and is x bigger than 0
     */
    allowToMoveLeft() {
        return this.world.keyboard.left && this.x > 0;
    }

    /**
     * do i press the "space" key and is the character in the air
     */
    allowToJump() {
        return this.world.keyboard.space && !this.isCharacterInAir(265);
    }

    /**
     * play the walking sound
     */
    playWalkingSounds() {
        if (!this.playWalkingSound) {
            this.walkingSound.currentTime = 0.3;
            this.walkingSound.volume = 0.3;
            this.walkingSound.play();
            this.playWalkingSound = true;
        }
    }

    /**
     * play the jump sound
     */
    playJumpSound() {
        this.walkingSound.volume = 0;
        if (!this.playjumpingSound) {
            this.jumpingSound.currentTime = 0;
            this.jumpingSound.volume = 0.3;
            this.jumpingSound.play();
            this.playjumpingSound = true;
        }
        this.playsnoreSound = false;
        this.snoreSound.pause();
    }

    /**
     * character movement and the matching sound
     */
    CharMovementAndSounds() {
        if (this.allowToMoveRight()) {
            this.moveRight();
            this.otherDirection = false;
            this.playWalkingSounds();
        }
        if (this.allowToMoveLeft()) {
            this.moveLeft();
            this.otherDirection = true;
            this.playWalkingSounds();
        }
        if (this.allowToJump()) {
            this.jump(25);
            this.playJumpSound();
            this.idleCounter = 0;
        }
        if (!this.isCharacterInAir(265)) {
            this.playjumpingSound = false;
        }
    }

    /**
     * This function causes the camera to move and not just the character
     * and places the character with a distance from the left edge.
     */
    setCamera() {
        this.world.cameraX = 120 + -this.x;
    }

    shotInterval() {
        setInterval(() => {
            if (this.allowToShot()) {
                this.allowToLongShot() && this.shot(false);
                this.allowToShortShot() && this.shot(true);
                this.idleCounter = 0;
                this.playsnoreSound = false;
                this.snoreSound.pause();
            }
        }, 100);
    }

    /**
     * do i press the "shot/shortShot" key and it's not in timeout 
     */
    allowToShot() {
        return (this.world.keyboard.shot && !this.timeout) || (this.world.keyboard.shortShot && !this.timeout);
    }

    /**
     * short = true.
     * long = false.
     * @param {boolean} longOrShort
     */
    shot(longOrShort) {
        this.bottleCounterIsNotEmty() && this.updateBottleCounterAndShot(longOrShort);
        this.timeout = true;
        setTimeout(() => {
            this.timeout = false;
        }, 500);
    }

    /**
     * do i press the "shot" key and you have bottles
     */
    allowToLongShot() {
        return this.world.keyboard.shot && this.world.bottleCounter > 0;
    }

    /**
     * do i press the "shortShot" key and you have bottles
     */
    allowToShortShot() {
        return this.world.keyboard.shortShot && this.world.bottleCounter > 0;
    }

    bottleCounterIsNotEmty() {
        return this.world.bottleCounter > 0;
    }

    /**
     * short = true.
     * long = false.
     * @param {boolean} longOrShort
     */
    updateBottleCounterAndShot(longOrShort) {
        this.bottleShortOrLong = new ThrowableObjects(this.x + 20, this.y + 40, this.otherDirection, longOrShort); // the numbers are there to throw the bottles from the correct position
        this.world.throwableObjects.push(this.bottleShortOrLong);
        this.world.bottleCounter -= 10;
        this.world.statBarBottle.setBottlePersentage(this.world.bottleCounter);
    }

    /**
     * plays the right animation
     */
    animationAndSoundsInterval() {
        setInterval(() => {
            if (this.isDead()) {
                this.deadActions();
            } else if (this.isHurt()) {
                this.isHurtActions();
            } else if (this.isCharacterInAir(265)) {
                this.jumpAnimation();
            } else {
                // Character on the Ground
                this.characterOnGround();
            }
        }, 105);
    }

    /**
     * if the character is dead do this
     */
    deadActions() {
        this.playAnimation(this.imagesDead);
        if (!this.gameover) {
            gameOver();
            this.dieSound.play();
            this.gameover = true;
        }
    }

    /**
     * if the character is hurt do this
     */
    isHurtActions() {
        this.playAnimation(this.imagesHit);
        this.idleCounter = 0;
        play && this.hitSound.play();
        this.walkingSound.volume = 0;
    }

    /**
     * plays the jump animation and reset the idleCounter
     */
    jumpAnimation() {
        this.playAnimationJumping(this.imagesJumping);
        this.idleCounter = 0;
    }

    characterOnGround() {
        this.walkingSound.volume = 0.3;
        this.currentImgJumping = 0;
        // If he is on the ground, the value is set to 0 so that he starts again at the first frame the next time he jumps
        this.CharacterMoveLeftOrRight() && this.walkAnimation();
        if (!this.CharacterMoveLeftOrRight()) {
            // If he stops
            this.playWalkingSound = false;
            this.walkingSound.pause();
            this.idleAnimationAndSnoreSound();
        }
    }

    /**
     * do i press the "right/left" key
     */
    CharacterMoveLeftOrRight() {
        return this.world.keyboard.right || this.world.keyboard.left;
    }

    /**
     * plays the walk animation
     */
    walkAnimation() {
        this.playAnimation(this.imagesWalking);
        this.idleCounter = 0;
        this.playsnoreSound = false;
        this.snoreSound.pause();
    }

    /**
     * plays the idle animation/sound and then the longIdle animation/sound
     */
    idleAnimationAndSnoreSound() {
        if (this.idleCounter < 10 && play) {
            this.playAnimation(this.imagesIdle);
            this.idleCounter += 0.5;
        } else {
            this.playAnimation(this.imagesLongIdle);
            if (!this.playsnoreSound && play) {
                this.snoreSound.currentTime = 0;
                this.snoreSound.volume = 0.3;
                this.snoreSound.play();
                this.playsnoreSound = true;
            }
        }
    }
}