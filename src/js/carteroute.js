export default class carteroute extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
      super({
        key: "carteroute" //  ici on précise le nom de la classe en tant qu'identifiant
      });
    }
  
  
  
  
    preload() {
  
      
  
  
      this.load.image("Phaser_tuilesdejeu", "src/assets/image003.jpg");
     // this.load.image("Phaser_tuilesdejeu2", "src/assets/soleil_pyr.png");
      this.load.image("Phaser_tuilesdejeu3", "src/assets/image002.png");
      this.load.image("Phaser_tuilesdejeu4", "src/assets/image004.png");
      this.load.image("Phaser_tuilesdejeu5", "src/assets/image008.png");
      this.load.image("Phaser_tuilesdejeu6", "src/assets/image007.png");
      this.load.image("Phaser_tuilesdejeu7", "src/assets/soleil_pyr.jpg");

      this.load.tilemapTiledJSON("carterou", "src/assets/route.json");
    }
  
  
    
    create() {
  
      
  
  
  
      const carteDuNiveau = this.add.tilemap("carterou");
      const tileset = carteDuNiveau.addTilesetImage("R.1", "Phaser_tuilesdejeu");
      //const tileset2 = carteDuNiveau.addTilesetImage("R.2", "Phaser_tuilesdejeu2");
      const tileset3 = carteDuNiveau.addTilesetImage("R.3", "Phaser_tuilesdejeu3");
      const tileset4 = carteDuNiveau.addTilesetImage("R.4", "Phaser_tuilesdejeu3");
      const tileset5 = carteDuNiveau.addTilesetImage("R.5", "Phaser_tuilesdejeu3");
      const tileset6 = carteDuNiveau.addTilesetImage("R.6", "Phaser_tuilesdejeu3");
      const tileset7 = carteDuNiveau.addTilesetImage("R.7", "Phaser_tuilesdejeu3");
      const tileset8 = carteDuNiveau.addTilesetImage("R.8", "Phaser_tuilesdejeu3");




  
      const calque_background_2 = carteDuNiveau.createLayer("ciel", [tileset,  tileset3,tileset4,tileset5,tileset6,tileset7,tileset8]);
      const calque_background_3 = carteDuNiveau.createLayer("herbe", [tileset,  tileset3,tileset4,tileset5,tileset6,tileset7,tileset8]);
      const calque_background_4 = carteDuNiveau.createLayer("arbre", [tileset,  tileset3,tileset4,tileset5,tileset6,tileset7,tileset8]);
      const calque_background_5 = carteDuNiveau.createLayer("maison", [tileset,  tileset3,tileset4,tileset5,tileset6,tileset7,tileset8]);
      const calque_background_6 = carteDuNiveau.createLayer("arbre2", [tileset, , tileset3,tileset4,tileset5,tileset6,tileset7,tileset8]);
      const calque_background = carteDuNiveau.createLayer("accessoire", [tileset,  tileset3,tileset4,tileset5,tileset6,tileset7,tileset8]);

      const calque_plateformes = carteDuNiveau.createLayer("route", [tileset, tileset3,tileset4,tileset5,tileset6,tileset7,tileset8]);
  
      calque_plateformes.setCollisionByProperty({ solideroute: true });
  
      this.player = this.physics.add.sprite(50, 550, "img_perso");
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
  
      if (this.clavier.up.isDown && this.player.body.blocked.down) {
        this.player.setVelocityY(-330);
      }
  
      if (
        this.player.x >= 2816 && this.player.x <= 2880 &&
        this.player.y >= 608 && this.player.y <= 640
      ) {
        this.scene.start("???????????????");
      }
      
  
    }
  
  };
  