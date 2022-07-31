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
      debug: true,
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
const PIPES_TO_RENDER = 4;

let bird = null;
let pipes = null;

let upperPipe = null;
let lowerPipe = null;

let pipeHorizontalDistance = 0;
const pipeVerticalDistanceRange = [150,250];
const pipeHorizontalDistanceRange = [500,550];

const flapVelocity = 300;
const initialBirdPosition = {x: config.width * 0.1, y: config.height / 2};

// Initializing instances of objects in memory
function create(){
  this.add.image(0,0,'sky').setOrigin(0);
  bird = this.physics.add.sprite(initialBirdPosition.x,initialBirdPosition.y,'bird').setOrigin(0);
  bird.body.gravity.y = 400;

  pipes = this.physics.add.group();

  for (let i = 0; i < PIPES_TO_RENDER; i++){
    const upperPipe = pipes.create(0,0,'pipe').setOrigin(0,1);
    const lowerPipe = pipes.create(0,0,'pipe').setOrigin(0,0);

    placePipe(upperPipe,lowerPipe);
  }
  pipes.setVelocityX(-200);

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);
}

// if bird y position is smaller than 0 greater than height of the canvas
// then alert 'you have lost'

function update(time,delta){
  if(bird.y > config.height || bird.y < 0){
    restartBirdPosition();
  }
  recyclePipes();
}

function placePipe(uPipe, lPipe){
  const rightMostX = getRightMostPipe();
  const pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
  const pipeVerticalPosition = Phaser.Math.Between(0+20, config.height - 20 - pipeVerticalDistance);
  const pipeHorizontalDistance = Phaser.Math.Between(...pipeHorizontalDistanceRange);

  uPipe.x = rightMostX + pipeHorizontalDistance;
  uPipe.y = pipeVerticalDistance;

  lPipe.x = uPipe.x;
  lPipe.y = uPipe.y + pipeVerticalDistance;
}

function recyclePipes(){
  const tempPipes = [];
  pipes.getChildren().forEach(pipe => {
    if (pipe.getBounds().right < 0) {
      tempPipes.push(pipe);
      if (tempPipes.length === 2){
        placePipe(...tempPipes);
      }
    }
  })
}
function getRightMostPipe(){
  let rightMostX = 0;

  debugger
  pipes.getChildren().forEach(function(pipe){
    debugger
    rightMostX = Math.max(pipe.x, rightMostX);
  })
  return rightMostX;
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