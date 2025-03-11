export default class cartefinal extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
      super({
        key: "cartefinal" //  ici on précise le nom de la classe en tant qu'identifiant
      });
    }
  
  
  
  
    preload() {
  
      
  
  
      this.load.image("Phaser_tuilesdejeu", "src/assets/??????????.png");
      this.load.tilemapTiledJSON("cartefin", "src/assets/Amphithéatre.json");
    }
  
  
    
    create() {
  
      
  
  
  
  
     
  
      const carteDuNiveau = this.add.tilemap("cartefin");
      const tileset = carteDuNiveau.addTilesetImage("tuiles_de_jeu", "Phaser_tuilesdejeu");
  
      const calque_background = carteDuNiveau.createLayer("calque_plateforem6", [tileset]);
      const calque_plateformes = carteDuNiveau.createLayer("calque_fond6", [tileset]);
  
      calque_plateformes.setCollisionByProperty({ estSolide: true });
  
      this.player = this.physics.add.sprite(100, 450, "img_perso");
      this.player.setBounce(0.1);
      this.player.setCollideWorldBounds(true);
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
        this.scene.start("carte2");
      }
      
  
    }
  
  };
  