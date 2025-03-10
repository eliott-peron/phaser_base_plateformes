import aceuille from "/src/js/aceuille.js"; 
import selection from "/src/js/selection.js";


 



// configuration générale du jeu
var config = {
  type: Phaser.AUTO,
  width: 800, // largeur en pixels
  height: 600, // hauteur en pixels
  physics: {
    // définition des parametres physiques
    default: "arcade", // mode arcade : le plus simple : des rectangles pour gérer les collisions. Pas de pentes
    arcade: {
      // parametres du mode arcade
      gravity: {
        y: 500 // gravité verticale : acceleration ddes corps en pixels par seconde
      },
      debug:true // permet de voir les hitbox et les vecteurs d'acceleration quand mis à true
    }
  },
  scene: [aceuille ,selection ] 
};

// création et lancement du jeu
var game = new Phaser.Game(config);
game.scene.start("aceuille");
