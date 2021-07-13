var PLAY  = 1;
var END  = 0;
var gameState = 1;

var sword,sword2,fruits,enemy,FruitGroup,EnemyGroup;
var backGround;
var score = 0;

var position;


var gameover,gameOver,cutSound;

function preload(){
  sword1 = loadImage("sword.png");
  enemys = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  sword2 = loadImage("gameover.png")
  
  cutSound = loadSound("knifeSwooshSound.mp3")
  gameOver  =loadSound("gameover.mp3")
}
function setup() {
  createCanvas(400, 400);
  
  sword = createSprite(200,200,30,50);
  sword.addImage(sword1);
  sword.scale = 0.5;
 // sword.setCollider("rectangle",0,0,40,40)
  
  
  fruitsGroup = new Group();
  enemyGroup = new Group();
  
}

function draw() {
  
 background ("lightblue")
  text ("score: "+score, 200,50)
  
  if (gameState === PLAY){
    
    fruits();
    enemy();
    
    sword.x = World.mouseX
    sword.y = World.mouseY
    
     if (fruitsGroup.isTouching(sword)){
    fruitsGroup.destroyEach();
    score = score+2;
    cutSound.play();  
  }
    else{
       if (enemyGroup.isTouching(sword)){
    gameState = END;
    gameOver.play();
  }
    }
    
  }
  
  if (gameState === END){
   sword.addImage(sword2);
    
    sword.x = 200;
    sword.y = 200;
    
     enemyGroup.destroyEach();
    fruitsGroup.destroyEach(); 
    
    enemyGroup.setVelocityEach(0);
    fruitsGroup.setVelocityEach(0);
    
    enemyGroup.setLifetimeEach (-1) ;
    fruitsGroup.setLifetimeEach(-1);
    
  }
  
  
  
  
 
  drawSprites();
  
 
}

function fruits(){
  
  
  if(frameCount % 80 === 0){
    var fruit = createSprite(400,Math.round(random(50,350)),30,30)
//  fruit.velocityX = -(4);
    position = Math.round(random(1,2));
    fruit.scale = 0.1;
    fruitsGroup.add(fruit);
    
    if (position === 1){
        fruit.x = 600;
        fruit.velocityX = -(7+ score / 4);
       
        }
    else {
      if(position === 2){
       // fruit.x = 0
         fruit.velocityX = (7+ score / 4);
         }
    }
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;
     
      default: break;
      
      
    fruit.lifetime = 200;
    }
    
  }
}

function enemy(){
  
  
  if(frameCount % 200 === 0){
    var enemy = createSprite(400,Math.round(random(100,300)),10,10)
    enemy.velocityX = -(9+ score / 10);
    enemy.scale = 1;
    enemy.addAnimation("poo",enemys)
    enemy.lifetime = 200;
    enemyGroup.add(enemy);
    
    
    }
    
  
}