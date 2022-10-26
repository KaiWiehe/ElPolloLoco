class CheckCollosion {

    world;
    endboss;
    chicken;

    openWinGame = false;

    constructor(world) {
        this.world = world;
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
        }, 10);
    }

    /** if you hit the chicken with your body, you will lose energy.
     * if you hit the chicken with your body and you are in the air, the chicken will die*/
    collosionCharacterChicken() {
        this.world.level.chickens.forEach((chicken) => {
            if (this.world.character.isColliding(chicken) && (this.world.character.isCharacterInAir(265))) {
                if (!chicken.dead) {
                    if (chicken instanceof SmallChicken) {
                        chicken.loadImg('assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png');
                    } else {
                        chicken.loadImg('assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
                    }
                    chicken.speed = 0;
                    clearInterval(chicken.moveLeftInterval); //stoppt die Intervalle
                    clearInterval(chicken.playAnimationInterval); //stoppt die Intervalle
                    clearInterval(chicken.jumpInterval); //stoppt die Intervalle
                    chicken.dead = true; // damit der keinen schaden mehr macht
                    this.world.character.speedY = 10;
                }
            } else if (this.world.character.isColliding(chicken)) {
                if (!chicken.dead) { // wenn das chicken noch lebt
                    this.CharacterLoseEnergy();
                }
            }
        });
    }

    /** if you hit the endboss with your body, you will lose energy */
    collisionCharacterEndboss() {
        this.world.level.endboss.forEach((endboss) => {
            if (this.world.character.isColliding(endboss)) { // spiele die attack animation
                if (!endboss.dead) { // wenn der endboss noch lebt
                    this.CharacterLoseEnergy();
                    endboss.attackIntervalActive = true; // spiele die attack animation
                    endboss.walkingIntervalActive = false; // spiele die attack animation
                }
            } else { // spiele die walking animation
                if (!endboss.alertIntervalActive && !endboss.dead) {
                    endboss.attackIntervalActive = false;
                    endboss.walkingIntervalActive = true;
                    endboss.moveLeft();
                }
            }
        });
    }

    /** if you collect a coin, it will be invisible. And add the coin to your counter */
    collisionCharacterCoin() {
        this.world.level.coin.forEach((coin) => {
            if (this.world.character.isColliding(coin)) {
                this.invisible(coin);
                this.world.coinCounter += 10;
                this.world.statBarCoin.setCoinPersentage(this.world.coinCounter);
            }
        });
    }

    /** if you collect a bottle, it will be invisible. And add the bottle to your counter */
    collisionCharacterBottle() {
        this.world.level.bottle.forEach((bottle) => {
            if (this.world.character.isColliding(bottle)) {
                this.invisible(bottle);
                this.world.bottleCounter += 10;
                this.world.statBarBottle.setBottlePersentage(this.world.bottleCounter);
            }
        });
    }

    collisionCharacterBarbedWire() {
        if (this.world.character.isColliding(this.world.level.clouds[1])) {
            this.CharacterLoseEnergy();
        };
    }

    /** check if you shot a chicken, show the dead chicken IMG */
    shotChicken() {
        this.world.throwableObjects.forEach((bottle) => {
            for (let i = 0; i < this.chicken.length; i++) {
                if (this.chicken[i].isColliding(bottle) && !bottle.broken && this.chicken[i].alive) {
                    this.chicken[i].alive = false;
                    if (this.chicken[i] instanceof SmallChicken) {
                        this.chicken[i].loadImg('assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png');
                    } else {
                        this.chicken[i].loadImg('assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
                    }
                    this.chicken[i].speed = 0;
                    clearInterval(this.chicken[i].moveLeftInterval); //stoppt die Intervalle
                    clearInterval(this.chicken[i].playAnimationInterval); //stoppt die Intervalle
                    clearInterval(this.chicken[i].jumpInterval); //stoppt die Intervalle
                    this.chicken[i].dead = true; // damit der keinen schaden mehr macht
                    //-----------------------
                    setTimeout(() => {
                        bottle.flying = false;
                        bottle.splash = true;
                        bottle.speedY = 0;
                        bottle.speedX = 0;
                    }, 100);
                    setTimeout(() => {
                        this.invisible(bottle);
                        bottle.broken = true;
                    }, 500);
                }
            }
        })
    }

    /** check if you shot the endboss and reduce the energy */
    shotEndboss() {
        this.world.throwableObjects.forEach((bottle) => {
            if (this.endboss.isColliding(bottle) && !bottle.broken) {
                this.endboss.hit(0.35);
                console.log(this.endboss.energy);
                if (this.endboss.energy <= 0) {
                    clearInterval(this.endboss.playAnimationInterval); //stoppt die Intervalle
                    this.endboss.dead = true; // damit der keinen schaden mehr macht
                    setTimeout(() => {
                        if (!this.openWinGame) {
                            openWinGame()
                            this.openWinGame = true;
                        }
                        clearInterval(timerInterval);
                    }, 1500);
                }
                //-----------------------
                setTimeout(() => {
                    bottle.flying = false;
                    bottle.splash = true;
                    bottle.speedY = 0;
                    bottle.speedX = 0;
                }, 100);
                setTimeout(() => {
                    this.invisible(bottle);
                    bottle.broken = true;
                }, 500);
            }
        })
    }

    /** check if endboss is dead and play dead animation */
    checkEndbossDead() {
        setInterval(() => {
            if (this.endboss.dead && this.endboss.currentImgEndboss <= 2) { // er soll nach dem dritten Bild wieder aufhören
                this.endboss.stopAllIntervals();
                this.endboss.playAnimationEndboss(this.endboss.imagesDead);
            }
        }, 200);
        setInterval(() => {
            if (this.endboss.dead) {
                this.endboss.y += 10;
            }
        }, 1000 / 30);
    }

    /** set width and height to zero */
    invisible(bottleOrCoin) {
        bottleOrCoin.width = 0;
        bottleOrCoin.height = 0; // TODO geht bestimmt schöner
    }

    CharacterLoseEnergy() {
        this.world.character.hit(0.5);
        this.world.statBarHealth.setHealthPersentage(this.world.character.energy); // Zieht der StatBar leben ab, Zeigt also das richtige bild je nach Lebensprozent
    }

}