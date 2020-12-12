var PLAY = 1;
var END =  0;
var gameState = PLAY ;


var monkey , monkey_running

var banana ,bananaImage, obstacle, obstacleImage

var FoodGroup, obstacleGroup

var score = 0;

var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(400,400);
  //to make our monkey
 monkey = createSprite(80,315,20,20);
 monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  //to make our monkey
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  //to make food and obstacle group 
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  survivalTime = 0;
}


function draw() {
  background(255);
  //to make our survival time appear 
 stroke("black");
    fill("black");
      textSize(20);
  
survivalTime = Math.round(frameCount/frameRate())
  text("Survival Time: "+ survivalTime ,100,50);
  //to make 
 stroke("white");
  textSize(20);
  fill("black");
  text("Score: "+score,300,100);
  //to make our monkey collide with ground
    monkey.collide(ground);
  
  if( gameState === PLAY){
    
    
    ground.velocityX = -(6+ 3*score/100);
    
  if(foodGroup.isTouching(monkey)){
    score = score +1;
    foodGroup.destroyEach();
  }

    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
   if(keyDown("space") && monkey.y >= 159){
    monkey.velocityY = -12;
  }
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }
    
    if(foodGroup.isTouching(monkey)){
      foodsGroup.destroyEach();
      score = score +1;
    }
  
 foods();
    obstacles ();
  
monkey.velocityY = monkey.velocityY + 0.8;
  
obstaclesGroup.setLifetimeEach(-1);
    
  }
  
  else if ( gameState === END ){
    background("black");
    
    
     stroke("red");
    fill("red");
       textSize(30);
  text("Game Over", 110, 200);
    monkey.destroy();
    survivalTime.visible = false;
    obstaclesGroup.destroyEach();
    foodGroup.destroyEach();
    
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
    
  }
  
  drawSprites();
}

function foods (){
  if (frameCount % 150 === 0) {
    var food = createSprite(600,300,40,10);
    food.y = Math.round(random(240,260));
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -3;
    
     //assign lifetime to the variable
    food.lifetime = 200;
    
    //add each cloud to the group
    foodGroup.add(food);
    
    if(monkey.isTouching(food)) {
       food.destroy(); 
    }
    
  }
  

}

function obstacles (){
    if(frameCount % 150 === 0) {
    var obstacle = createSprite(600,355,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(3 + 3*score/100);
    
    //generate random obstacles
    obstacle.addImage(obstacleImage);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


