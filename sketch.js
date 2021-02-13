var PLAY = 1;
var END = 0;
var gameState = PLAY;

var hero,heroImage;
var villen,villenImage;
var villenGrunt,gruntImage;
var HBullet,VBullet;
var h1;
var Space;

var score=0;

var gameOver, restart;
var villenGruntGroup,HBulletGroup;
localStorage["HighestScore"] = 0;

function preload(){
  heroImage= loadImage("hero.png");
  Space=loadImage("space.png");
  h1=loadImage("HeroBullet.png")
  gruntImage=loadImage("villenGrunt.png");
  villenImage=loadImage("Villen.png");
}

function setup() {
  createCanvas(600,600);
  hero=createSprite(200,580,10,10);
  hero.addImage("v",heroImage);
  hero.scale=0.1;
  villenGruntGroup=new Group();
  HBulletGroup=new Group();
  score=0;
  
}

function draw() {
  background(Space);
     if(gameState === PLAY){
         spawnVillenGrunt();
  hero.x= World.mouseX;
    if (keyDown("space")) {
  createBullets();
    }
 if(villenGruntGroup.isTouching(HBulletGroup)){
   score=score+1;
   HBulletGroup.destroyEach();
   villenGruntGroup.destroyEach();
     }
     if(villenGruntGroup.isTouching(hero)){
    hero.destroy();
    gameState = "end"
  }
  drawSprites();
     }
   
    text("Score: "+ score, 500,50);
  fill("red");
   if (gameState === "end"){
     hero.destroy();
    background(0,0,0);
  stroke("red");
  fill("black");
      textSize(50);
  text("GAMEOVER ",150,300);
    if(localStorage["high score"]<score){
      localStorage["high score"]=score;
  } 
   }
}
function spawnVillenGrunt() {
  //write code here to spawn the clouds
  if (frameCount % 160 === 0) {
    var villenGrunt = createSprite(600,-50);
    villenGrunt.x = Math.round(random(100,400));
    villenGrunt.addImage(gruntImage);
    villenGrunt.scale = 0.3;
    villenGrunt.velocityY=3;
     //assign lifetime to the variable
    villenGrunt.lifetime = 300;
    
    //add each cloud to the group
    villenGruntGroup.add(villenGrunt);
  }
}
 function createBullets() {
  var HBullet= createSprite(100, 100, 60, 10);
  HBullet.addImage(h1);
  HBullet.x = hero.x;
  HBullet.y=560
  HBullet.velocityY = -4;
  HBullet.lifetime = 100;
  HBullet.scale = 0.1;
  HBulletGroup.add(HBullet);
  return HBullet;
   
}