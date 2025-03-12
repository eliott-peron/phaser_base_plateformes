export default class carteegypte extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "carteegypte"
    });
  }

  preload() {
    this.load.image("Phaser_tuilesdejeu", "src/assets/jeux_pyr.png");
    this.load.image("Phaser_tuilesdejeu2", "src/assets/soleil_pyr.png");
    this.load.image("Phaser_tuilesdejeu3", "src/assets/ciel_pyr.jpg");
    this.load.tilemapTiledJSON("carteegy", "src/assets/antiquite.json");
    this.load.image("sphinx", "src/assets/sphynxe.png"); // Charge l'image du Sphinx

    this.load.spritesheet("img_perso", "src/assets/player.png", {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  create() {
    const carteDuNiveau = this.add.tilemap("carteegy");
    const tileset = carteDuNiveau.addTilesetImage("A.2", "Phaser_tuilesdejeu");
    const tileset2 = carteDuNiveau.addTilesetImage("A.3", "Phaser_tuilesdejeu2");
    const tileset3 = carteDuNiveau.addTilesetImage("A.1", "Phaser_tuilesdejeu3");

    const calque_background_2 = carteDuNiveau.createLayer("montagne", [tileset, tileset2, tileset3]);
    const calque_background_3 = carteDuNiveau.createLayer("arbre", [tileset, tileset2, tileset3]);
    const calque_background_4 = carteDuNiveau.createLayer("pyramide", [tileset, tileset2, tileset3]);
    const calque_background_5 = carteDuNiveau.createLayer("détails", [tileset, tileset2, tileset3]);
    const calque_background_6 = carteDuNiveau.createLayer("chameau", [tileset, tileset2, tileset3]);
    const calque_background = carteDuNiveau.createLayer("fond", [tileset, tileset2, tileset3]);

    const calque_plateformes = carteDuNiveau.createLayer("sol", [tileset, tileset2, tileset3]);
    calque_plateformes.setCollisionByProperty({ estsolidepyr: true });

    this.player = this.physics.add.sprite(50, 550, "img_perso");
    this.player.setBounce(0.1);
    this.player.body.onWorldBounds = true;

    this.sphinx = this.physics.add.sprite(500, 50, "sphinx"); // Création du Sphinx aux coordonnées (500, 50)
    this.sphinx.setImmovable(true); // Le Sphinx ne se déplace pas
    this.physics.add.collider(this.sphinx, calque_plateformes); // Collision avec le sol pour éviter qu'il passe à travers

    this.dialogue = null; // Variable de dialogue

    this.clavier = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, calque_plateformes);
    this.physics.add.collider(this.player, this.sphinx); // Collider entre le joueur et le Sphinx

    this.physics.world.setBounds(0, 0, 3200, 640);
    this.cameras.main.setBounds(0, 0, 3200, 640);
    this.cameras.main.startFollow(this.player);

    this.anims.create({
      key: "anim_tourne_gauche",
      frames: this.anims.generateFrameNumbers("img_perso", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "anim_face",
      frames: [{ key: "img_perso", frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: "anim_tourne_droite",
      frames: this.anims.generateFrameNumbers("img_perso", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    // Zone de détection autour du Sphinx
    this.zoneDeDetection = new Phaser.Geom.Circle(this.sphinx.x, this.sphinx.y, 300); // Rayon de détection de 150 pixels
  }

  detecterProximiteSphinx() {
    // Vérifie si le joueur est dans la zone de détection
    if (Phaser.Geom.Circle.Contains(this.zoneDeDetection, this.player.x, this.player.y)) {
      // Si le joueur est proche du Sphinx, afficher un message
      this.afficherMessage("Je suis le Sphinx. Résous mon énigme ! On peu me décrire comme merveilleuse, ma forme est dite comme pythagoresque, sur moi comme inoxtag tu devras faire pour aller dans la salle suivante...");
    } else {
      if (this.dialogue) {
        this.dialogue.setVisible(false); // Cache le message si le joueur s'éloigne
      }
    }
  }

  afficherMessage(message) {
    if (this.dialogue) {
      this.dialogue.setText(message);
      this.dialogue.setVisible(true); 
    } else {
      // Créer un texte de dialogue avec un retour à la ligne automatique
      this.dialogue = this.add.text(this.player.x, this.player.y - 50, message, {
        fontSize: '20px',
        fill: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 10 },
        wordWrap: { width: 600, useAdvancedWrap: true } // Ajoute un retour à la ligne automatique à 600 pixels de largeur
      });
    }
  }
  

  update() {
    // Met à jour la zone de détection du Sphinx
    this.zoneDeDetection.x = this.sphinx.x;
    this.zoneDeDetection.y = this.sphinx.y;

    // Détection de la proximité du Sphinx
    this.detecterProximiteSphinx();

    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-300);
      this.player.anims.play("anim_tourne_gauche", true);
    } else if (this.clavier.right.isDown) {
      this.player.setVelocityX(300);
      this.player.anims.play("anim_tourne_droite", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("anim_face");
    }

    if (this.clavier.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-330); // Si le joueur est sur une plateforme, il peut sauter
    }

    // Ajoute un contrôle pour la transition à une nouvelle scène si besoin
    if (this.player.x >= 2976 && this.player.x <= 3100 && this.player.y >= 500 && this.player.y <= 640) {
      this.scene.start("cartepyramide");
    }
  }
}
