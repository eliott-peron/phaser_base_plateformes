export default class carteespace extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
      super({
        key: "carteespace" //  ici on précise le nom de la classe en tant qu'identifiant
      });
    }
  
  
  
  
    preload() {
  
      
  
  
      this.load.image("Phaser_tuilesdejeu", "src/assets/immage_dessert.png");
      this.load.image("Phaser_tuilesdejeu2", "src/assets/immage_espace.png");
      this.load.image("Phaser_tuilesdejeuplanette", "src/assets/image_planette.png");
      this.load.image("Phaser_tuilesdejeu4", "src/assets/immage_imeuble.png");

      this.load.tilemapTiledJSON("cartesp", "src/assets/futur.json");
    }
  
  
    
    create() {
  
      
  
  
  
  
     
  
      const carteDuNiveau = this.add.tilemap("cartesp");
      const tileset = carteDuNiveau.addTilesetImage("A.2", "Phaser_tuilesdejeu");
      const tileset2 = carteDuNiveau.addTilesetImage("F.1", "Phaser_tuilesdejeu2");
      const tileset3 = carteDuNiveau.addTilesetImage("F.2", "Phaser_tuilesdejeuplanette");
      const tileset4 = carteDuNiveau.addTilesetImage("F.3", "Phaser_tuilesdejeu4");

  
      const calque_background = carteDuNiveau.createLayer("fond", [tileset, tileset2, tileset3, tileset4]);
      const calque_background_2 = carteDuNiveau.createLayer("planètes", [tileset, tileset2, tileset3, tileset4]);
      const calque_background_3 = carteDuNiveau.createLayer("cailloux", [tileset, tileset2, tileset3,tileset4]);
      const calque_background_4 = carteDuNiveau.createLayer("logement", [tileset, tileset2, tileset3,tileset4]);


      const calque_plateformes = carteDuNiveau.createLayer("logement 2", [tileset, tileset2, tileset3, tileset4]);
  
      calque_plateformes.setCollisionByProperty({ estsolidespace: true });
  
      this.player = this.physics.add.sprite(100, 450, "img_perso");
      this.player.setBounce(0.1);
      this.player.body.onWorldBounds = true;
      this.player.body.world.on(
        "worldbounds", // evenement surveillé
        function (body, up, down, left, right) {
          // on verifie si la hitbox qui est rentrée en collision est celle du player,
          // et si la collision a eu lieu sur le bord inférieur du player
          if (body.gameObject === this.player && down == true) {
            // si oui : GAME OVER on arrete la physique et on colorie le personnage en rouge
            this.physics.pause();
            this.player.setTint(0xff0000);
            this.time.delayedCall(700,
              function () {
                this.scene.restart();
              },
              null, this);
          }
        },
        this
      );
  
  
  
  
  
      this.clavier = this.input.keyboard.createCursorKeys();
      this.physics.add.collider(this.player, this.groupe_plateformes);
  
  
      this.physics.add.collider(this.player, calque_plateformes);
  
      this.physics.world.setBounds(0, 0, 3200, 640);
      this.cameras.main.setBounds(0, 0, 3200, 640);
      this.cameras.main.startFollow(this.player);
  
  
  
      this.anims.create({
        key: "anim_tourne_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
        frames: this.anims.generateFrameNumbers("img_perso", { start: 0, end: 3 }), // on prend toutes les frames de img perso numerotées de 0 à 3
        frameRate: 10, // vitesse de défilement des frames
        repeat: -1 // nombre de répétitions de l'animation. -1 = infini
      });
  
      // creation de l'animation "anim_tourne_face" qui sera jouée sur le player lorsque ce dernier n'avance pas.
      this.anims.create({
        key: "anim_face",
        frames: [{ key: "img_perso", frame: 4 }],
        frameRate: 20
      });
  
      // creation de l'animation "anim_tourne_droite" qui sera jouée sur le player lorsque ce dernier tourne à droite
      this.anims.create({
        key: "anim_tourne_droite",
        frames: this.anims.generateFrameNumbers("img_perso", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      });
    }
  
    update() {
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
  
      if (this.clavier.up.isDown) {
        this.player.setVelocityY(-330);
      }
  
     
      
      
  
    }
  
  };
  