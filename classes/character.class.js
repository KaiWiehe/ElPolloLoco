class Character extends MovableObject {

    imagesWalking = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
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

    // ##########################################################################################################

    speed = 3;
    world;

    walkingSound = new Audio('assets/audio/walking.mp3');
    walkingSoundSlow = this.walkingSound.playbackRate = 0.5; // Abspielgeschwindigkeit

    /* #############################################   Funktionen   ############################################# */

    constructor() {
        super().loadImg('assets/img/2_character_pepe/2_walk/W-21.png');
        this.loadImgArray(this.imagesWalking);
        this.loadImgArray(this.imagesJumping);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walkingSound.pause();
            if (this.world.keyboard.right && this.x < this.world.level.levelEnd) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walkingSound.play();
            }
            if (this.world.keyboard.left && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walkingSound.play();
            }
            // damit er nicht am linken Rand klebt muss ich hier den x-Wert aus der Klasse MO gebens
            // damit er einen abstand zum Linken Rand hat 
            this.world.cameraX = 120 + -this.x;
        }, 1000 / 60)
        setInterval(() => {
            if (this.world.keyboard.right || this.world.keyboard.left) {
                // Walk animation
                this.playAnimation(this.imagesWalking);
            }
            if (this.world.keyboard.space === true) {
                // Jump animation
                let i = this.currentImg % this.imagesJumping.length;
                let path = this.imagesJumping[i];
                this.img = this.imageCache[path];
                this.currentImg++;
            }

        }, 100)
    }

    jump() {

    }
}