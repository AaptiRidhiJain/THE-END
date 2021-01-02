var ground;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var jungle, jungleImage;
var foodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage = loadImage("jungle.jpg");
}

function setup() {
  createCanvas(400, 400);
  
  jungle = createSprite(0, 0, 400, 400);
  jungle.addImage(jungleImage);
  jungle.scale = 1.2;
  jungle.velocityX = -3;
  
  monkey = createSprite(100, 350);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.shapeColor = "brown";
  ground.velocityX = -3;
  ground.visible = false;

  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background("lightgreen");

  camera.position.x = monkey.x;
  camera.position.y = displayHeight/4;

  if(gameState === 1){
    if(keyDown("space")){
      monkey.velocityY = -8;
    }
    monkey.velocityY = monkey.velocityY + 0.8;

    if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
      score = score + 1;
    }

    spawnFood();
    spawnObstacles();

    if(monkey.isTouching(obstacleGroup)){
      gameState = 0;  
    }
  }

  else if(gameState === 0){
    monkey.scale = 0.09; 
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    //obstacleGroup.destroyEach();
    //foodGroup.destroyEach();
    ground.velocityX = 0;
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    jungle.velocityX = 0;
  }
  
  if(ground.x < 0){
    ground.x = ground.width/2; 
  }
  
   if(jungle.x < 0){
    jungle.x = jungle.width/2; 
  }

  monkey.collide(ground);
   
  switch(score){
    case 10:monkey.scale = 0.12;
      break;
    case 20:monkey.scale = 0.14;
      break;
    case 30:monkey.scale = 0.16;
      break;
    case 40:monkey.scale = 0.18;
      break;
    default: break;
  }
   
   drawSprites();

   stroke("black");
   textSize(23);
   fill("black");
   text("Score: " + score, -40, 20);
   
   stroke("black");
   textSize(23);
   fill("black");
   survivalTime = Math.ceil(frameCount/frameRate());
   text("Survival Time: " + survivalTime, 100, 20);

   }

function spawnFood(){
   if(frameCount % 300 === 0){
    banana = createSprite(450, 100, 20, 20);
    banana.addImage(bananaImage);
    banana.y = random(100, 150);
    banana.scale = 0.1;
    banana.velocityX = -8;
    banana.lifetime = 200;
    monkey.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(450, 330, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -8;
    obstacle.lifetime = 200;
    monkey.depth = obstacle.depth + 1;
    //obstacle.debug = true;
    obstacle.setCollider("circle", 0, 0, 200);
    obstacleGroup.add(obstacle);
  }
}