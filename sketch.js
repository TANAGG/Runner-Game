var count = 0
var ground,runner,gameOver,restart;
var PLAY = 1;
var END = 0;
var gameState = PLAY;



function setup() {
  createCanvas(600,600);
   ground = createSprite(580,0,400,1500);
   runner = createSprite(480,590,20,100);
  runner.shapeColor = "red"
   ObstaclesGroup = createGroup()
   gameOver = createSprite(200,300);
   restart = createSprite(200,340);
  gameOver.visible = false;
  restart.visible = false;
  textSize(18);
  textFont("Georgia");
  textStyle(BOLD);
  
  
  
}

function draw() {
  background("white");
  createEdgeSprites()
  text("Score: "+ count, 250, 100);
  if(gameState === PLAY){
  ground.velocityY = -6
  count = count + Math.round(World.frameRate/60);
  if (ground.y < 0){
    ground.y = ground.height/2;
  }

  if(keyDown("RIGHT_ARROW")){
     runner.velocityX = 2;
  }

  if(keyDown("LEFT_ARROW")){
    runner.velocityX = -2;
 }

 if(ObstaclesGroup.isTouching(runner)){
  gameState = END;
}

 spawnObstacles()
}else if(gameState === END) {
  textSize(30);
  text("GameOver",500,300)
    ground.velocityY = 0;
    runner.velocityX = 0;
    ObstaclesGroup.setVelocityYEach(0);
    ObstaclesGroup.setLifetimeEach(-1);
}

  drawSprites();

  
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(580,0,10,40);
    obstacle.velocityY =  6;
    obstacle.shapeColor = "blue"
    //generate random obstacles
    var rand = random(400,580);
    obstacle.x = rand
    
    //assign scale and lifetime to the obstacle           
    
    obstacle.lifetime = 100;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}