export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MenuScene" });
    }

    preload() {
        this.load.image("menu_background", "src/assets/imagebase.png");
        this.load.image("play_button", "src/assets/play.png");
    }

    create() {
        // Ajout du fond avec un léger effet de zoom
        let bg = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "menu_background");
        let scaleX = this.cameras.main.width / bg.width;
        let scaleY = this.cameras.main.height / bg.height;
        let scale = Math.max(scaleX, scaleY);
        bg.setScale(scale).setScrollFactor(0);

        // Ajout d'un titre
        this.add.text(this.cameras.main.width / 2, 100, "Ecole temporelle", {
            font: "48px MedievalSharp",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        }).setOrigin(0.5);

        // Ajout du bouton Play avec animation
        let playButton = this.add.image(this.cameras.main.width / 2, 400, "play_button").setInteractive();
        playButton.setScale(1.2);

        playButton.on("pointerover", () => {
            playButton.setScale(1.4);
        });

        playButton.on("pointerout", () => {
            playButton.setScale(1.2);
        });

        playButton.on("pointerdown", () => {
            this.scene.start("selection");
        });
    }
}
