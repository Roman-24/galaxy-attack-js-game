
// scena so zobrazením inštrukcií k hre
instructions = function() {
  var sceneObjects = []
  sceneObjects.push(new Background("background2") );
  sceneObjects.push(new Button('menu',650,0,30,30, "home") );
  sceneObjects.push(new Button('sound',690,0,30,30, "sound") );
  return sceneObjects;
};

// scena s levelom
level = function() {
  var sceneObjects = []
  sceneObjects.push(new Background("background") );
  sceneObjects.push(new Button('menu',0,0,30,30, "home") );
  var player = new Player();
  sceneObjects.push(player);	
  sceneObjects.push(new Button('sound',690,0,30,30, "sound") );	
  game.spawnEnemy = true
  return sceneObjects;
};

// scena so zobrazením menu
menu = function() {
  var sceneObjects = []
  sceneObjects.push(new Background("background") );
  sceneObjects.push(new Button('level', 200,100,130,87, "play") );
  sceneObjects.push(new Button('instructions', 200,200,270,61, "instructions") );
  sceneObjects.push(new Button('sound',690,0,30,30, "sound") );
  return sceneObjects;
};

const resourceManager = new ResourceManager();
window.onmousemove = function (event){
  game.onmousemove(event);
}
window.onmousedown = function (event){
  game.onmousedown(event);
}
window.onmouseup = function (event){
  game.onmouseup(event);
}

// globálna premenná GAME
const game = new Game();
game.start();

// globalna premennna na zistenie či je koneic hry
var gameover = false;

setInterval( game.gamspeed,30000);
setInterval( game.spawning, 3000);
setInterval( game.vylepsi, 5000);
setInterval( game.umries, 5000+Math.floor(Math.random() * 20000));