export default class cartepyramide extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
      super({
        key: "cartepyramide" //  ici on précise le nom de la classe en tant qu'identifiant
      });
    }
  
  
  
  
    preload() {
  
      
  
  
      this.load.image("Phaser_tuilesdejeu11", "src/assets/pyr2.png");
      this.load.image("Phaser_tuilesdejeu22", "src/assets/pyr1.png");
      this.load.image("Phaser_tuilesdejeu33", "src/assets/pyr3.png");
      this.load.tilemapTiledJSON("carte", "src/assets/pyramide.json");
    }
  
  
    
    create() {
  
      
  
  
  
  
     
  
      const carteDuNiveau = this.add.tilemap("carte");
      const tileset = carteDuNiveau.addTilesetImage("I.1", "Phaser_tuilesdejeu11");
      const tileset2 = carteDuNiveau.addTilesetImage("I.2", "Phaser_tuilesdejeu22");
      const tileset3 = carteDuNiveau.addTilesetImage("I.3", "Phaser_tuilesdejeu33");
  
      const calque_background = carteDuNiveau.createLayer("fond", [tileset, tileset2, tileset3]);
      const calque_background_2 = carteDuNiveau.createLayer("porte", [tileset, tileset2, tileset3]);
      const calque_plateformes = carteDuNiveau.createLayer("bloc", [tileset, tileset2, tileset3]);
  
      calque_plateformes.setCollisionByProperty({ estsolide9: true });
  
      this.player = this.physics.add.sprite(50, 50, "img_perso");
      this.player.setBounce(0.1);
      this.player.setCollideWorldBounds(true);
      this.player.body.onWorldBounds = true;
      
  
  
  
  
      this.clavier = this.input.keyboard.createCursorKeys();
      this.physics.add.collider(this.player, this.groupe_plateformes);
  
  
      this.physics.add.collider(this.player, calque_plateformes);
  
      this.physics.world.setBounds(0, 0, 640, 3200);
      this.cameras.main.setBounds(0, 0, 640, 3200);
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
        this.player.x >= 600 && this.player.x <= 640 &&
        this.player.y >= 3100 && this.player.y <= 3200
      ) {
        this.scene.start("carteespace");
      }
      
  
    }
  
  };
  