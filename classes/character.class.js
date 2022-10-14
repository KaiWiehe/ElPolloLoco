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
        'assets/img/2_character_pepe/3_jump/J-39.png'
    ];
    imagesDead = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png'
    ];
    imagesHit = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png'
    ];

    // ##########################################################################################################

    speed = 3;
    //world;

    walkingSound = new Audio('assets/audio/walking.mp3');
    walkingSoundSlow = this.walkingSound.playbackRate = 0.5; // Abspielgeschwindigkeit

    offset = {
        top: 60,
        bottom: 5,
        left: 15,
        right: 20
    }

    /* #############################################   Funktionen   ############################################# */

    constructor() {
        super().loadImg(this.imagesWalking[0]); // TODO Kann ich aus irgendeinem Grund nicht wegnehmen
        this.loadImgArray(this.imagesWalking);
        this.loadImgArray(this.imagesJumping);
        this.loadImgArray(this.imagesDead);
        this.loadImgArray(this.imagesHit);
        this.animate();
        this.applyGravity()
    }

    animate() {
        //Bewegung und Sound
        setInterval(() => {
            this.walkingSound.pause();
            if (this.world.keyboard.right && this.x < this.world.level.levelEnd) {
                this.moveRight();
                this.otherDirection = false;
                //TODO this.walkingSound.play();
            }
            if (this.world.keyboard.left && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                //TODO this.walkingSound.play();
            }
            if (this.world.keyboard.space && !this.isCharacterInAir()) {
                this.jump();
            }
            // damit er nicht am linken Rand klebt muss ich hier den x-Wert aus der Klasse MO gebens
            // damit er einen abstand zum Linken Rand hat 
            // Das macht das sich nur die Kamera bewegt
            this.world.cameraX = 120 + -this.x;
        }, 1000 / 60);

        setInterval(() => { // muss in eine andere schleife weil die andere zu schnell ist, da wirft er eine ganze schlange von flaschen
            if (this.world.keyboard.shot) {
                if (this.world.bottleCounter > 0) {
                    let bottle = new ThrowableObjects(this.x + 20, this.y + 40); // die zahlen sind dazu da die flaschen von der richtigen position aus zu werden 
                    world.throwableObjects.push(bottle);
                    this.world.bottleCounter -= 10;
                    this.world.statBarBottle.setBottlePersentage(this.world.bottleCounter);
                    console.log(this.world.bottleCounter);
                }
            }
        }, 100);
        // Animationen
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.imagesDead);
            } else if (this.isHurt()) {
                this.playAnimation(this.imagesHit);
            } else if (this.isCharacterInAir()) {
                // Jump animation 
                this.playAnimationJumping(this.imagesJumping);
            } else { // Character on the Ground
                this.currentImgJumping = 0; // Wenn er auf dem Boden steht wird der wert auf 0 gesetzt damit er beim nächsten sprung wieder beim ersten Bild anfängt
                if (this.world.keyboard.right || this.world.keyboard.left) {
                    // Walk animation
                    this.playAnimation(this.imagesWalking);
                } else { // Wenn er stehen bleibt
                    this.currentImg = 0; // wenn er stehen bleibt setzt sich der wert wieder auf 0 damit er beim erneuten loslaufen wieder beim ersten Bild anfängt
                    this.loadImg('assets/img/2_character_pepe/1_idle/idle/I-1.png'); // wenn er stehen bleibt zeigt er das Bild an
                }
            }
        }, 105);
    }
}