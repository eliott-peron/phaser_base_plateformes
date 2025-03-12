export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MenuScene" });
    }

    preload() {
        this.load.image("menu_background", "src/assets/imageaccueil.png");
        this.load.image("play_button", "src/assets/boutonplay.png");
        this.load.image("regles_button", "src/assets/boutonregles (1).png");
        this.load.image("menu_background", "src/assets/imageaccueil.png");
        this.load.image("play_button", "src/assets/boutonplay.png");
        this.load.image("regles_button", "src/assets/boutonregles (1).png");
    }

    create() {
        // Ajout du fond avec un léger effet de zoom
        let bg = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "menu_background");
        let scaleX = this.cameras.main.width / bg.width;
        let scaleY = this.cameras.main.height / bg.height;
        let scale = Math.max(scaleX, scaleY);
        bg.setScale(scale).setScrollFactor(0);

        // Ajout d'un titre
        

        // Ajout du bouton Play avec animation
        let playButton = this.add.image(this.cameras.main.width / 2, 480, "play_button").setInteractive();
        playButton.setScale(0.8);
        let playButton = this.add.image(this.cameras.main.width / 2, 480, "play_button").setInteractive();
        playButton.setScale(0.8);

        playButton.on("pointerover", () => {
            playButton.setScale(1);
        });

        playButton.on("pointerout", () => {
            playButton.setScale(0.8);
        });

        playButton.on("pointerdown", () => {
            this.scene.start("selection");
        });

        let reglesButton = this.add.image(this.cameras.main.width / 3.5, 483, "regles_button").setInteractive();
        reglesButton.setScale(0.3);

        reglesButton.on("pointerover", () => {
            reglesButton.setScale(0.4);
        });

        reglesButton.on("pointerout", () => {
            reglesButton.setScale(0.3);
        });

        
    }
}