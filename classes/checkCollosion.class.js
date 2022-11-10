class CheckCollosion {

    world;
    endboss;
    chicken;

    openWinGame = false;

    chickenKillSound = new Audio('assets/audio/chickenKill.mp3');
    smallChickenKillSound = new Audio('assets/audio/smallChickenKill.m4a');
    endbossKillSound = new Audio('assets/audio/endbossKill.mp3');
    barbedWireSound = new Audio('assets/audio/barbedWire2.mp3');
    pickCoinSound = new Audio('assets/audio/picCoin.wav');
    pickBottleSound = new Audio('assets/audio/pickBottle.wav');

    playbarbedWireSound = false;

    goDown = false;

    barbedWire;

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
        }, 1000 / 60); //10
    }

    /** if you hit the chicken with your body, you will lose energy.
     * if you hit the chicken with your body and you are in the air, the chicken will die*/
    collosionCharacterChicken() {
        this.world.level.chickens.forEach((chicken) => {
            if (this.world.character.isColliding(chicken) && (this.world.character.isCharacterInAir(265))) {
                this.jumpOnChicken(chicken);
            } else if (this.world.character.isColliding(chicken)) {
                if (!chicken.dead) { // wenn das chicken noch lebt
                    this.CharacterLoseEnergy(0.5);
                }
            }
        });
    }

    /** if you hit the endboss with your body, you will lose energy */
    collisionCharacterEndboss() {
        this.world.level.endboss.forEach((endboss) => {
            if (this.world.character.isColliding(endboss)) {
                this.collissionEndboss(endboss);
            } else { // spiele die walking animation
                this.noCollisionEndboss(endboss);
            }
        });
    }

    /** if you collect a coin, it will be invisible. And add the coin to your counter */
    collisionCharacterCoin() {
        this.world.level.coin.forEach((coin) => {
            if (this.world.character.isColliding(coin)) {
                this.collisionCoin(coin);
            }
        });
    }

    /** if you collect a bottle, it will be invisible. And add the bottle to your counter */
    collisionCharacterBottle() {
        this.world.level.bottle.forEach((bottle) => {
            if (this.world.character.isColliding(bottle)) {
                this.collisionBottle(bottle)
            }
        });
    }

    collisionCharacterBarbedWire() {
        if (this.world.character.isColliding(this.barbedWire)) {
            this.collisionBarbedWire();
        } else {
            this.noCollisionBarbedWire();
        };
        !play && this.barbedWireSound.pause();
    }

    /** check if you shot a chicken, show the dead chicken IMG */
    shotChicken() {
        this.world.throwableObjects.forEach((bottle) => {
            this.chicken.forEach((chicken) => {
                if (chicken.isColliding(bottle) && !bottle.broken && chicken.alive) {
                    this.killChicken(chicken);
                    //-----------------------
                    this.bottleActions(bottle);
                }
            })
        })
    }

    /** check if you shot the endboss and reduce the energy */
    shotEndboss() {
        this.world.throwableObjects.forEach((bottle) => {
            if (this.endboss.isColliding(bottle) && !bottle.broken) {
                this.bottleCollisionEndboss(bottle);
            }
        })
    }

    /** check if endboss is dead and play dead animation */
    checkEndbossDead() {
        setInterval(() => {
            if (this.endbossDead()) {
                this.finishTheGame();
            }

        }, 200);
        setInterval(() => {
            if (this.endbossDead() && this.goDown) this.endboss.y += 10;
        }, 1000 / 30);
    }

    /** set width and height to zero */
    invisible(bottleOrCoin) {
        bottleOrCoin.width = 0;
        bottleOrCoin.height = 0; // TODO geht bestimmt schöner
    }

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

    smallChickenDead(chicken) {
        this.smallChickenKillSound.play();
        this.smallChickenKillSound.volume = 0.3;
        chicken.loadImg('assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png');
    }

    jumpOnChicken(chicken) {
        if (!chicken.dead) { // wenn ich drauf springe
            this.killChicken(chicken);
            this.world.character.speedY = 10; // springt ein bisschen nach oben nachden man auf ein chicken gesprungen ist
        }
    }

    chickenDead(chicken) {
        this.chickenKillSound.play();
        this.chickenKillSound.volume = 0.3;
        chicken.loadImg('assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
    }

    killChicken(chicken) {
        chicken.alive = false;
        if (chicken instanceof SmallChicken) {
            this.smallChickenDead(chicken);
        } else {
            this.chickenDead(chicken);
        }
        chicken.speed = 0;
        clearInterval(chicken.moveLeftInterval); //stoppt die Intervalle
        clearInterval(chicken.playAnimationInterval); //stoppt die Intervalle
        clearInterval(chicken.jumpInterval); //stoppt die Intervalle
        chicken.dead = true; // damit der keinen schaden mehr macht
    }

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

    collissionEndboss(endboss) {
        if (!endboss.dead) { // wenn der endboss noch lebt
            this.CharacterLoseEnergy(2);
            endboss.attackIntervalActive = true; // spiele die attack animation
            endboss.walkingIntervalActive = false; // stoppt die walking animation
        }
    }

    noCollisionEndboss(endboss) {
        if (!endboss.alertIntervalActive && !endboss.dead) {
            endboss.attackIntervalActive = false; // stoppt die attack animation
            if (!endboss.hurtIntervalActive && !this.endbossDead()) { //TODO
                endboss.walkingIntervalActive = true; // startet die walking animation
            }
            endboss.moveLeft(); // läuft nach links
            this.world.level.levelEnd = endboss.x; // damit kann pepe nicht hinter den endboss laufen
        }
    }

    collisionCoin(coin) {
        this.invisible(coin);
        this.updateCoinCounter();
        this.coinSounds();
    }

    updateCoinCounter() {
        this.world.coinCounter += 10;
        this.world.statBarCoin.setCoinPersentage(this.world.coinCounter);
    }

    coinSounds() {
        this.pickCoinSound.play();
        this.pickCoinSound.volume = 0.3;
    }

    collisionBottle(bottle) {
        this.invisible(bottle);
        this.updateBottleCounter();
        this.bottleSounds();
    }

    updateBottleCounter() {
        this.world.bottleCounter += 10;
        this.world.statBarBottle.setBottlePersentage(this.world.bottleCounter);
    }

    bottleSounds() {
        this.pickBottleSound.play();
        this.pickBottleSound.volume = 0.4;
    }

    collisionBarbedWire() {
        this.CharacterLoseEnergy(0.5);
        this.barbedWireSounds();
    }

    barbedWireSounds() {
        if (!this.playbarbedWireSound) {
            this.barbedWireSound.play();
            this.barbedWireSound.currentTime = 8;
            this.stopBarbedWireSound();
            this.playbarbedWireSound = true;
        }
    }

    noCollisionBarbedWire() {
        this.playbarbedWireSound = false;
        this.barbedWireSound.currentTime = 0;
        this.barbedWireSound.pause();
    }

    bottleCollisionEndboss(bottle) {
        this.updateEndbossEnergy();
        this.bottleActions(bottle);
        this.endbossAnimations();
    }

    updateEndbossEnergy() {
        this.endboss.hit(0.60);
        this.world.statBarEndboss.setEndbossPersentage(this.endboss.energy)
    }

    finishTheGame() {
        this.endbossAnimationsAndSound();
        this.openWinGameScreen();
    }

    endbossAnimationsAndSound() {
        setTimeout(() => {
            if (this.endboss.currentImgEndbossDead <= 2) { // er soll nach dem dritten Bild wieder aufhören
                this.endbossDeadAnimation()
                this.endbossSound();
            }
        }, 750);
        clearInterval(this.endboss.playAnimationInterval); //stoppt die Intervalle
    }

    openWinGameScreen() {
        setTimeout(() => {
            if (!this.openWinGame) { // sonst wird es immer und immer wieder geöffnet
                openWinGame()
                this.openWinGame = true;
            }
            clearInterval(timerInterval);
        }, 2000);
    }

    endbossDeadAnimation() {
        this.endboss.stopAllIntervals();
        this.endboss.playAnimationEndbossDead(this.endboss.imagesDead);
        this.goDown = true;
    }

    endbossSound() {
        this.endbossKillSound.play();
        this.endbossKillSound.volume = 0.3;
    }

    endbossAnimations() {
        this.endboss.walkingIntervalActive = false; // stoppt die walking Animation
        this.endboss.hurtIntervalActive = true; //Spielt die Hurt Animation
    }
}