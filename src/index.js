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
      // gravity: {y:400},
      debug:true
    }
  },
  scene:{
    preload,
    create,
    update
  }
}

// Loading assets
function preload(){
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe','assets/pipe.png');
}
const VELOCITY = 200;
let bird = null;
let pipe = null;
const flapVelocity = 300;
const initialBirdPosition = {x: config.width * 0.1, y: config.height / 2};
// Initializing instances of objects in memory
function create(){
  this.add.image(0,0,'sky').setOrigin(0);
  bird = this.physics.add.sprite(initialBirdPosition.x,initialBirdPosition.y,'bird').setOrigin(0);
  bird.body.gravity.y = 400;
  pipe = this.add.sprite(300,350,'pipe').setOrigin(0);

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);
}

// if bird y position is smaller than 0 greater than height of the canvas
// then alert 'you have lost'

function update(time,delta){
  if(bird.y > config.height || bird.y < 0){
    restartBirdPosition();
  }
}

function restartBirdPosition(){
  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;
  bird.body.velocity.y = 0;
}
function flap(){
  bird.body.velocity.y = -flapVelocity;
}
new Phaser.Game(config);