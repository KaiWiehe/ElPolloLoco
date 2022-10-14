class CheckCollosion {

    world;
    endboss;
    chicken;

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

            this.shotChicken(); // Bottle => Chicken
            this.shotEndboss(); // Bottle => Endboss
        }, 100);
    }


    /** if you hit the chicken with your body, you will lose energy */
    collosionCharacterChicken() {
        this.world.level.chickens.forEach((chicken) => {
            if (this.world.character.isColliding(chicken)) {
                if (!chicken.dead) { // wenn das chicken noch lebt
                    this.CharacterLoseEnergy();
                }
            }
        });
    }

    /** if you hit the endboss with your body, you will lose energy */
    collisionCharacterEndboss() {
        this.world.level.endboss.forEach((endboss) => {
            if (this.world.character.isColliding(endboss)) {
                if (!endboss.dead) { // wenn das chicken noch lebt
                    this.CharacterLoseEnergy();
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

    /** check if you shot a chicken, show the dead chicken IMG */
    shotChicken() {
        this.world.throwableObjects.forEach((bottle) => {
            for (let i = 0; i < this.chicken.length; i++) {
                if (this.chicken[i].isColliding(bottle)) {
                    this.chicken[i].loadImg('assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
                    this.chicken[i].speed = 0;
                    clearInterval(this.chicken[i].moveLeftInterval); //stoppt die Intervalle
                    clearInterval(this.chicken[i].playAnimationInterval); //stoppt die Intervalle
                    this.chicken[i].dead = true; // damit der keinen schaden mehr macht
                }
            }
        })
    }

    /** check if you shot the endboss and reduce the energy */
    shotEndboss() {
        this.world.throwableObjects.forEach((bottle) => {
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
            if (this.endboss.dead && this.endboss.currentImgEndboss <= 2) { // er soll nach dem dritten Bild wieder aufhören
                this.endboss.playAnimationEndboss(this.world.level.endboss[0].imagesDead);
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
        this.world.character.hit();
        this.world.statBarHealth.setHealthPersentage(this.world.character.energy); // Zieht der StatBar leben ab, Zeigt also das richtige bild je nach Lebensprozent
    }

}