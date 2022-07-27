var path;
var player;
var obstacle;
var playerImg;
var invisible;
var obstacleImg;
var pathImg;
var roca

var END =0;
var PLAY =1;
var gameState = PLAY;

var score=0;
var gameOver, restart;

function preload() {
playerImg = loadImage("Jugador.png");
obstacleImg = loadImage("Medalla_Roca.png");
pathImg = loadImage("Road.png");

}

function setup() {
    createCanvas(1200,300);
    
    invisible=createSprite(600,290,1200,10);
    invisible.visible=false;
    
    path=createSprite(100,150);
    path.addImage(pathImg);
    path.velocityX = -5;

    player=createSprite(100,280);
    player.addAnimation("caminar",playerImg);
    player.scale=0.1;

    obstacles = new Group();

}

function draw() {
 background(0);

drawSprites();
textSize(20);
text("Score: "+ score,900,30);

if(gameState===PLAY) {
   score = score + Math.round(getFrameRate()/60);
   path.velocityX = -6


   edges= createEdgeSprites();
   player.collide(edges);

   if(path.x < 0 ){
    path.x = width/2;
   }

   
   
  player.y = World.mouseY;

  rock();


   player.setCollider("rectangle");

   if(obstacles.isTouching(player)) {
    gameState = END;
    roca.velocityX = 0
   }
   
}else if (gameState === END) {

textSize(20);
text("Presiona la tecla de arriba para reiniciar", 500,200);

player.velocityX = 0;
path.velocityX = 0;
if(keyDown("UP_ARROW")) {
    reset();
}
}
}


function rock () {
roca = createSprite(1100,Math.round(random(50, 250)));
roca.scale = 0.06;
roca.velocityX = -6;
roca.addImage(obstacleImg);
roca.setLifetime=170;
obstacles.add(roca);
} 


function reset() {
   gameState = PLAY;
   score=0;

}