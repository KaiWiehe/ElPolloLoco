class CheckCollosion {
    world;
    endboss;
    chicken;

    openWinGame = false;

    //sounds
    chickenKillSound = new Audio('assets/audio/chickenKill.mp3');
    smallChickenKillSound = new Audio('assets/audio/smallChickenKill.m4a');
    endbossKillSound = new Audio('assets/audio/endbossKill.mp3');
    barbedWireSound = new Audio('assets/audio/barbedWire2.mp3');
    pickCoinSound = new Audio('assets/audio/picCoin.wav');
    pickBottleSound = new Audio('assets/audio/pickBottle.wav');

    playbarbedWireSound = false;
    //sounds end

    goDown = false;

    barbedWire;

    /* #############################################   functions   ############################################# */

    /**
     * 
     * @param {object} world - to connect the class world
     */
    constructor(world) {
        this.world = world;
        this.barbedWire = this.world.level.clouds[7];
        this.checkCollosion();
        this.checkEndbossDead();
        this.endboss = this.world.level.endboss[0];
        this.chicken = this.world.level.chickens;
    }

    checkCollosion() {
        setInterval(() => {
            this.collosionCharacterChicken(); // Character => Chicken
            this.collisionCharacterEndboss(); // Character => Endboss
            this.collisionCharacterCoin(); // Character => Coin
            this.collisionCharacterBottle(); // Character => Bottle
            this.collisionCharacterBarbedWire(); // Character => BarbedWire

            this.shotChicken(); // Bottle => Chicken
            this.shotEndboss(); // Bottle => Endboss
        }, 1000 / 60);
    }

    /**
     * if you hit the chicken with your body, you will lose energy.
     * if you hit the chicken with your body and you are in the air, the chicken will die.
     */
    collosionCharacterChicken() {
        this.world.level.chickens.forEach((chicken) => {
            if (this.world.character.isColliding(chicken) && this.world.character.isCharacterInAir(265)) {
                this.jumpOnChicken(chicken);
            } else if (this.world.character.isColliding(chicken)) {
                if (!chicken.dead) {
                    // if the chicken is still alive
                    this.CharacterLoseEnergy(0.5);
                }
            }
        });
    }

    /**
     * if you hit the endboss with your body, you will lose energy.
     */
    collisionCharacterEndboss() {
        this.world.level.endboss.forEach((endboss) => {
            this.world.character.isColliding(endboss) ? this.collissionEndboss(endboss) : this.noCollisionEndboss(endboss);
        });
    }

    /**
     * if you collect a coin, it will be invisible. And add the coin to your counter.
     */
    collisionCharacterCoin() {
        this.world.level.coin.forEach((coin) => {
            this.world.character.isColliding(coin) && this.collisionCoin(coin);
        });
    }

    /**
     * if you collect a bottle, it will be invisible. And add the bottle to your counter.
     */
    collisionCharacterBottle() {
        this.world.level.bottle.forEach((bottle) => {
            this.world.character.isColliding(bottle) && this.collisionBottle(bottle);
        });
    }

    collisionCharacterBarbedWire() {
        this.world.character.isColliding(this.barbedWire) ? this.collisionBarbedWire() : this.noCollisionBarbedWire();
        !play && this.barbedWireSound.pause();
    }

    /**
     * check if you shot a chicken, show the dead chicken IMG.
     */
    shotChicken() {
        this.world.throwableObjects.forEach((bottle) => {
            this.chicken.forEach((chicken) => {
                chicken.isColliding(bottle) && !bottle.broken && chicken.alive && (this.killChicken(chicken), this.bottleActions(bottle));
            });
        });
    }

    /**
     * check if you shot the endboss and reduce the energy.
     */
    shotEndboss() {
        this.world.throwableObjects.forEach((bottle) => {
            this.endboss.isColliding(bottle) && !bottle.broken && this.bottleCollisionEndboss(bottle);
        });
    }

    /**
     * check if endboss is dead and play dead animation.
     */
    checkEndbossDead() {
        setInterval(() => {
            this.endbossDead() && this.finishTheGame();
        }, 200);
        setInterval(() => {
            this.endbossDead() && this.goDown && (this.endboss.y += 10);
        }, 1000 / 30);
    }

    /**
     * @param {object} bottleOrCoin - sets the height and width of the object to zero, it will be invisible.
     */
    invisible(bottleOrCoin) {
        bottleOrCoin.width = 0;
        bottleOrCoin.height = 0;
    }

    /**
     * @example
     * // The character will lose 2 energy in the 1000 / 60 interval.
     * CharacterLoseEnergy(2);
     * @param {number} damage - set the damage the character will lose.
     */
    CharacterLoseEnergy(damage) {
        this.world.character.hit(damage);
        this.world.statBarHealth.setHealthPersentage(this.world.character.energy); // Zieht der StatBar leben ab, Zeigt also das richtige bild je nach Lebensprozent
    }

    endbossDead() {
        return this.endboss.energy <= 0;
    }

    stopBarbedWireSound() {
        setInterval(() => {
            if (this.barbedWireSound.currentTime >= 15) {
                this.barbedWireSound.currentTime = 0;
                this.barbedWireSound.pause();
            }
        }, 100);
    }

    /**
     * Play smallChickenKillSound and load an other IMG for the chicken.
     * @param {class} chicken
     */
    smallChickenDead(chicken) {
        this.smallChickenKillSound.play();
        this.smallChickenKillSound.volume = 0.3;
        chicken.loadImg('assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png');
    }

    /**
     * If the chicken is still alive, the chicken will die.
     * And the character will jump up.
     * @param {class} chicken
     */
    jumpOnChicken(chicken) {
        if (!chicken.dead) {
            this.killChicken(chicken);
            this.world.character.speedY = 10;
        }
    }

    /**
     * Play chickenKillSound and load an other IMG for the chicken.
     * @param {class} chicken
     */
    chickenDead(chicken) {
        this.chickenKillSound.play();
        this.chickenKillSound.volume = 0.3;
        chicken.loadImg('assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
    }

    /**
     * @param {class} chicken
     */
    killChicken(chicken) {
        chicken.alive = false;
        chicken instanceof SmallChicken ? this.smallChickenDead(chicken) : this.chickenDead(chicken);
        chicken.speed = 0;
        clearInterval(chicken.moveLeftInterval); //stops the intervals
        clearInterval(chicken.playAnimationInterval); //stops the intervals
        clearInterval(chicken.jumpInterval); //stops the intervals
        chicken.dead = true; // it doesn't do any more damage
    }

    /**
     * Play the splash animation and after 500 ms the bottle will be invisible.
     * @param {class} bottle
     */
    bottleActions(bottle) {
        setTimeout(() => {
            bottle.flying = false;
            bottle.splash = true;
            bottle.speedY = 0;
            bottle.speedX = 0;
            bottle.bottleSounds();
        }, 100);
        setTimeout(() => {
            this.invisible(bottle);
            bottle.broken = true;
        }, 500);
    }

    /**
     * If the endboss is still alive and hit the character, the char will lose energy.
     * Play the endboss attack animation.
     * @param {class} endboss
     */
    collissionEndboss(endboss) {
        if (!endboss.dead) {
            this.CharacterLoseEnergy(2);
            endboss.attackIntervalActive = true; // play the attack animation
            endboss.walkingIntervalActive = false; // stops the walking animation
        }
    }

    /**
     * @param {class} endboss
     */
    noCollisionEndboss(endboss) {
        if (!endboss.alertIntervalActive && !endboss.dead) {
            endboss.attackIntervalActive = false; // stops the attack animation
            if (!endboss.hurtIntervalActive && !this.endbossDead()) {
                endboss.walkingIntervalActive = true; // start the walking animation
            }
            endboss.moveLeft(); // runs to the left
            this.world.level.levelEnd = endboss.x; // so the char can't run behind the endboss
        }
    }

    /**
     * @param {class} coin
     */
    collisionCoin(coin) {
        this.invisible(coin);
        this.updateCoinCounter();
        this.coinSounds();
    }

    updateCoinCounter() {
        this.world.coinCounter += 10;
        this.world.statBarCoin.setCoinPersentage(this.world.coinCounter);
    }

    /**
     * plays the coin sound
     */
    coinSounds() {
        this.pickCoinSound.play();
        this.pickCoinSound.volume = 0.3;
    }

    /**
     * @param {class} bottle
     */
    collisionBottle(bottle) {
        this.invisible(bottle);
        this.updateBottleCounter();
        this.bottleSounds();
    }

    updateBottleCounter() {
        this.world.bottleCounter += 10;
        this.world.statBarBottle.setBottlePersentage(this.world.bottleCounter);
    }

    /**
     * plays the bottle sound
     */
    bottleSounds() {
        this.pickBottleSound.play();
        this.pickBottleSound.volume = 0.4;
    }

    /**
     * hit the character and plays the barbedWireSound
     */
    collisionBarbedWire() {
        this.CharacterLoseEnergy(0.5);
        this.barbedWireSounds();
    }

    /**
     * plays the barbedWireSound
     */
    barbedWireSounds() {
        if (!this.playbarbedWireSound) {
            this.barbedWireSound.play();
            this.barbedWireSound.currentTime = 8;
            this.stopBarbedWireSound();
            this.playbarbedWireSound = true;
        }
    }

    /**
     * reset the barbed wire
     */
    noCollisionBarbedWire() {
        this.playbarbedWireSound = false;
        this.barbedWireSound.currentTime = 0;
        this.barbedWireSound.pause();
    }

    /**
     * @param {class} bottle
     */
    bottleCollisionEndboss(bottle) {
        this.updateEndbossEnergy();
        this.bottleActions(bottle);
        this.endbossAnimations();
    }

    /**
     * hit the endboss and update the statbar
     */
    updateEndbossEnergy() {
        this.endboss.hit(0.6);
        this.world.statBarEndboss.setEndbossPersentage(this.endboss.energy);
    }

    /**
     * if you kill the endboss 
     */
    finishTheGame() {
        this.endbossAnimationsAndSound();
        this.openWinGameScreen();
    }

    endbossAnimationsAndSound() {
        setTimeout(() => {
            if (this.endboss.currentImgEndbossDead <= 2) {
                // it should stop after the third frame
                this.endbossDeadAnimation();
                this.endbossSound();
            }
        }, 750);
        clearInterval(this.endboss.playAnimationInterval); //stops the intervals
    }

    openWinGameScreen() {
        setTimeout(() => {
            if (!this.openWinGame) {
                // otherwise it will be opened over and over again
                openWinGame();
                this.openWinGame = true;
            }
        }, 2000);
    }

    endbossDeadAnimation() {
        this.endboss.stopAllIntervals();
        this.endboss.playAnimationEndbossDead(this.endboss.imagesDead);
        this.goDown = true;
    }

    /**
     * plays the endboss sound
     */
    endbossSound() {
        this.endbossKillSound.play();
        this.endbossKillSound.volume = 0.3;
    }

    endbossAnimations() {
        this.endboss.walkingIntervalActive = false; // stops the walking animation
        this.endboss.hurtIntervalActive = true; //start the hurt animation
    }
}