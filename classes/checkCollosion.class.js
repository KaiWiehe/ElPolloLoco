class CheckCollosion {

    world;
    endboss = world.level.endboss[0];

    constructor() {
        this.checkCollosion();
        this.checkEndbossDead();
    }

    checkCollosion() {
        setInterval(() => {
            this.collosionCharacterChicken(); // Character => Chicken
            this.collisionCharacterEndboss(); // Character => Endboss
            this.collisionCharacterCoin(); // Character => Coin
            this.collisionCharacterBottle(); // Character => Bottle

            this.shotChicken(); // Bottle => Chicken
            this.shotEndboss(); // Bottle => Endboss
        }, 100);
    }


    /** if you hit the chicken with your body, you will lose energy */
    collosionCharacterChicken() {
        this.level.chickens.forEach((chicken) => {
            if (this.character.isColliding(chicken)) {
                if (!chicken.dead) { // wenn das chicken noch lebt
                    this.CharacterLoseEnergy();
                }
            }
        });
    }

    /** if you hit the endboss with your body, you will lose energy */
    collisionCharacterEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                if (!endboss.dead) { // wenn das chicken noch lebt
                    this.CharacterLoseEnergy();
                }
            }
        });
    }

    /** if you collect a coin, it will be invisible. And add the coin to your counter */
    collisionCharacterCoin() {
        this.level.coin.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.invisible(coin);
                this.coinCounter += 10;
                this.statBarCoin.setCoinPersentage(this.coinCounter);
            }
        });
    }

    /** if you collect a bottle, it will be invisible. And add the bottle to your counter */
    collisionCharacterBottle() {
        this.level.bottle.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.invisible(bottle);
                this.bottleCounter += 10;
                this.statBarBottle.setBottlePersentage(this.bottleCounter);
            }
        });
    }

    /** check if you shot a chicken, show the dead chicken IMG */
    shotChicken() {
        this.throwableObjects.forEach((bottle) => {
            for (let i = 0; i < this.level.chickens.length; i++) {
                if (this.level.chickens[i].isColliding(bottle)) {
                    this.level.chickens[i].loadImg('assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
                    this.level.chickens[i].speed = 0;
                    clearInterval(this.level.chickens[i].moveLeftInterval); //stoppt die Intervalle
                    clearInterval(this.level.chickens[i].playAnimationInterval); //stoppt die Intervalle
                    this.level.chickens[i].dead = true; // damit der keinen schaden mehr macht
                }
            }
        })
    }

    /** check if you shot the endboss and reduce the energy */
    shotEndboss() {
        this.throwableObjects.forEach((bottle) => {
            if (this.endboss.isColliding(bottle)) {
                this.endboss.hit();
                console.log('endboss:', this.endboss.energy);
                if (this.endboss.energy <= 0) {
                    clearInterval(this.endboss.playAnimationInterval); //stoppt die Intervalle
                    this.endboss.dead = true; // damit der keinen schaden mehr macht
                }
            }
        })
    }

    /** check if endboss is dead and play dead animation */
    checkEndbossDead() {
        setInterval(() => {
            if (this.endboss.dead && this.endboss.currentImgEndboss <= 2) {
                this.endboss.playAnimationEndboss(this.level.endboss[0].imagesDead);
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
        this.character.hit();
        this.statBarHealth.setHealthPersentage(this.character.energy); // Zieht der StatBar leben ab, Zeigt also das richtige bild je nach Lebensprozent
    }

}