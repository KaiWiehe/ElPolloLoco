class Character extends MovableObject {
    imagesWalking = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png',
    ];
    imagesJumping = [
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png',
    ];
    imagesDead = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png',
    ];
    imagesHit = ['assets/img/2_character_pepe/4_hurt/H-41.png', 'assets/img/2_character_pepe/4_hurt/H-42.png', 'assets/img/2_character_pepe/4_hurt/H-43.png'];

    imagesIdle = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    imagesLongIdle = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    // ##########################################################################################################

    speed = 3;

    walkingSound = new Audio('assets/audio/running.wav');
    hitSound = new Audio('assets/audio/hit.wav');
    jumpingSound = new Audio('assets/audio/jump.wav');
    dieSound = new Audio('assets/audio/die.m4a');
    snoreSound = new Audio('assets/audio/snore.mp3');

    playWalkingSound = false;
    playhitSound = false;
    playjumpingSound = false;
    playdieSound = false;
    playsnoreSound = false;

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

    /* #############################################   Funktionen   ############################################# */

    constructor() {
        super().loadImg(this.imagesWalking[0]);
        this.loadImgArray(this.imagesWalking);
        this.loadImgArray(this.imagesJumping);
        this.loadImgArray(this.imagesDead);
        this.loadImgArray(this.imagesHit);
        this.loadImgArray(this.imagesIdle);
        this.loadImgArray(this.imagesLongIdle);
        this.animate();
        this.applyGravity();
    }

    animate() {
        this.characterMovementAndSounds();
        this.shotInterval();
        this.animationAndSoundsInterval();
    }

    characterMovementAndSounds() {
        setInterval(() => {
            play && (this.CharMovementAndSounds(), this.setCamera());
        }, 1000 / 60);
    }

    allowToMoveRight() {
        return this.world.keyboard.right && this.x < this.world.level.levelEnd;
    }

    allowToMoveLeft() {
        return this.world.keyboard.left && this.x > 0;
    }

    allowToJump() {
        return this.world.keyboard.space && !this.isCharacterInAir(265);
    }

    playWalkingSounds() {
        if (!this.playWalkingSound) {
            this.walkingSound.currentTime = 0.3;
            this.walkingSound.volume = 0.3;
            this.walkingSound.play();
            this.playWalkingSound = true;
        }
    }

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

    allowToShot() {
        return (this.world.keyboard.shot && !this.timeout) || (this.world.keyboard.shortShot && !this.timeout);
    }

    allowToLongShot() {
        return this.world.keyboard.shot && this.world.bottleCounter > 0;
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

    deadActions() {
        this.playAnimation(this.imagesDead);
        if (!this.gameover) {
            gameOver();
            this.dieSound.play();
            this.gameover = true;
        }
    }

    isHurtActions() {
        this.playAnimation(this.imagesHit);
        this.idleCounter = 0;
        this.hitSound.play();
        this.walkingSound.volume = 0;
    }

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

    CharacterMoveLeftOrRight() {
        return this.world.keyboard.right || this.world.keyboard.left;
    }

    walkAnimation() {
        this.playAnimation(this.imagesWalking);
        this.idleCounter = 0;
        this.playsnoreSound = false;
        this.snoreSound.pause();
    }

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