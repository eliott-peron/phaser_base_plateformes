var groupe_etoiles;

export default class cartePreHistoire extends Phaser.Scene {
  constructor() {
    super({
      key: "cartePreHistoire"
    });
    this.previousPosition = { x: 50, y: 50 }; // Position de sauvegarde
    this.dialogue = null; // Initialisation de la variable dialogue
    this.etoilesCollectees = 0;  // Variable pour suivre les étoiles collectées
    this.nombreTotalEtoiles = 6;  // Total des étoiles dans le jeu
    this.messagesEtoiles = [
      "les deux grandes périodes de la Préhistoire sont Le Paléolithique et le Néolithique !",
      "hominidé a maîtrisé le feu en premier est l'Homo Erectus  !",
      "les premiers humains utilisais Des pierres taillées (silex), des os et du bois comme outil  !",
      "un des premiers sites d’art rupestre connu est la grotte de Lascaux ",
      "les premières grandes civilisations sont apparue En Mésopotamie (Irak actuel), en Égypte, en Inde et en Chine.!",
      "Plus qu'une pour tout finir !"
    ];
    this.messageIndex = 0; // Pour suivre quel message afficher
  }

  preload() {
    this.load.image("phaser_prehistoire", "src/assets/Example_1.png");
    this.load.image("phaser_prehistoire2", "src/assets/Example_2.png");
    this.load.tilemapTiledJSON("prehistoire", "src/assets/Prehistoire.json");

    this.load.spritesheet("img_perso", "src/assets/player.png", {
      frameWidth: 32,
      frameHeight: 48
    });

    this.load.spritesheet("img_pnj", "src/assets/tiny_character.png", {
      frameWidth: 32,
      frameHeight: 48
    });

    this.load.image("img_etoile", "src/assets/os.png"); 
  }

  create() {
    const carteDuNiveau = this.add.tilemap("prehistoire");
    const tileset = carteDuNiveau.addTilesetImage("prehistoire", "phaser_prehistoire");
    const tileset2 = carteDuNiveau.addTilesetImage("prehistoire2", "phaser_prehistoire2");

    const calque_background = carteDuNiveau.createLayer("calque_fond", [tileset, tileset2]);
    const calque_plateformes = carteDuNiveau.createLayer("calque_solide", [tileset, tileset2]);
    calque_plateformes.setCollisionByProperty({ estSolide2: true });

    this.player = this.physics.add.sprite(50, 50, "img_perso");
    this.player.setBounce(0.1);
    this.player.body.onWorldBounds = true;

    this.pnj = this.physics.add.sprite(1000, 200, "img_pnj");
    this.anims.create({
      key: "pnj_idle",
      frames: this.anims.generateFrameNumbers("img_pnj", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });
    this.pnj.anims.play("pnj_idle");
    this.physics.add.collider(this.pnj, calque_plateformes);

    this.physics.add.collider(this.player, calque_plateformes);
    this.clavier = this.input.keyboard.createCursorKeys();

    this.physics.world.setBounds(0, 0, 3200, 640);
    this.cameras.main.setBounds(0, 0, 3200, 640);
    this.cameras.main.startFollow(this.player);

    groupe_etoiles = this.physics.add.group();

    // Tableau des positions précises des étoiles
    const positionsEtoiles = [
      { x: 448, y: 50 }, // Etoile 1
      { x: 1216, y: 100 }, // Etoile 2
      { x: 864, y: 100 }, // Etoile 3
      { x: 2208, y: 100 }, // Etoile 4
      { x: 2592, y: 300 }, // Etoile 5
      { x: 2912, y: 350 }, // Etoile 6
    ];

    // Créez les étoiles à ces positions
    positionsEtoiles.forEach((position) => {
      groupe_etoiles.create(position.x, position.y, "img_etoile");
    });

    this.physics.add.collider(groupe_etoiles, calque_plateformes); 

    this.physics.add.overlap(this.player, groupe_etoiles, this.ramasserEtoile, null, this);

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
  }

  ramasserEtoile(un_player, une_etoile) {
    une_etoile.disableBody(true, true);
    this.etoilesCollectees++;  // Incrémente le compteur d'étoiles collectées
  
    // Afficher un message différent selon l'étoile collectée
    const message = this.messagesEtoiles[this.messageIndex];
    this.afficherMessage(message);
  
    // Passer au message suivant
    this.messageIndex = (this.messageIndex + 1) % this.messagesEtoiles.length;
  
    // Vérifier si toutes les étoiles ont été collectées
    if (this.etoilesCollectees === this.nombreTotalEtoiles) {
      this.permettreTransition();  // Si toutes les étoiles sont collectées, permettre la transition
    }
  }
  

  permettreTransition() {
    // Affiche un message ou tout autre action avant la transition
    this.afficherMessage("vous avez trouver toutes les relique");
    
    // Vous pouvez ajouter un délai avant la transition si nécessaire
    this.time.delayedCall(4000, () => {
      this.scene.start("carteegypte");  // Changer pour la scène suivante
    });
  }

  afficherMessage(message) {
    // Si un message est déjà affiché, le mettre à jour
    if (this.dialogue) {
      this.dialogue.setText(message); // Met à jour le texte si un texte existe déjà
      this.dialogue.setVisible(true); // S'assure que le texte est visible
    } else {
      // Créer un nouveau texte de dialogue
      this.dialogue = this.add.text(this.player.x, this.player.y - 100, message, { // Positionnement plus élevé
        fontSize: '20px',
        fill: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 10 },
        wordWrap: { width: 300, useAdvancedWrap: true }  // Limite la largeur du texte
      });
  
      // Centrer le texte horizontalement autour du joueur
      this.dialogue.setOrigin(0.5, 0);
    }
  
    // Cacher le message après un délai plus long (par exemple, 4 secondes)
    this.time.delayedCall(7000, () => { // Augmenter ici pour une durée plus longue
      if (this.dialogue) {
        this.dialogue.setVisible(false); // Cache le message après le délai
      }
    });
  
  
  
  
  
  
    this.time.delayedCall(7000, () => {
      if (this.dialogue) {
        this.dialogue.setVisible(false); // Cache le message après un délai
      }
    });
  }

  update() {
    const currentPosition = { x: this.player.x, y: this.player.y };
  
    if (this.player.y >= 640) {
      this.player.setPosition(50, 50);
    }
  
    if (this.player.x <= 1) {
      this.player.setPosition(this.previousPosition.x, this.previousPosition.y);
    }
  
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
      this.player.setVelocityY(-330);
    }
  
    // Met à jour la position du message pour suivre le joueur
    if (this.dialogue) {
      this.dialogue.setPosition(this.player.x, this.player.y - 50); // Ajuste la position du texte
    }
  }
}  