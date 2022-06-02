import Phaser from 'phaser';

const config = {
  // WebGL js api for rendering 2d and 3d graphics.
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
  // Arcade physics plugin, manages physics simulations
    default: 'arcade',
    arcade: {
      gravity: {y:200}
    }
  },
  scene:{
    preload,
    create,
    update
  }
}
let bird = null;
// Loading assets
function preload(){
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}
// Initializing instances of objects in memory
function create(){
  this.add.image(0,0,'sky').setOrigin(0);
  bird = this.physics.add.sprite(config.width*0.1,config.height/2,'bird').setOrigin(0);
}

// 60 fps / 60 times per second updates
function update(time,delta){
}
new Phaser.Game(config);