class Powerup { // power up jedna
  constructor() {
      this.canvas = document.getElementById("canvas");
      this.image = resourceManager.getImageSource('powerup');
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.dy = 1.9 + Math.random();
  }
  move(dt) {
      const canvas = this.canvas;
      // Movement
      this.y += this.dy + game.speed;
      this.checkCollision();
      if( this.y > canvas.height-100){
        game.removeFromScene(game.objects,this);
      }
  }
  checkCollision(){
      for (var i in game.objects) {
          var obj = game.objects[i];
          if ( obj instanceof Player ) {
            if( this.x >= obj.x-30 && this.x <= obj.x+30 && this.y >= obj.y-30 && this.y <= obj.y+30 ){
              game.objects = game.removeFromScene(game.objects,this);
            }
          } 
      }
  };
  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.scale(this.size, this.size)
    ctx.drawImage(this.image, -20, -20, 40, 40)
    ctx.restore()
  }
}




class Powerup2 { //power up dva
  constructor() {
      this.canvas = document.getElementById("canvas");
      this.image = resourceManager.getImageSource('powerup2');
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.dy = 2 + Math.random();
  }
  move(dt) {
      const canvas = this.canvas;
      // Movement
      this.y += this.dy + game.speed;
      this.checkCollision();
      if( this.y > canvas.height-100){
        game.removeFromScene(game.objects,this);
      }
  }
  checkCollision(){
      for (var i in game.objects) {
          var obj = game.objects[i];
          if ( obj instanceof Player ) {
            if( this.x >= obj.x-30 && this.x <= obj.x+30 && this.y >= obj.y-30 && this.y <= obj.y+30 ){
              game.objects = game.removeFromScene(game.objects,this);
            }
          } 
      }
  };
  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.scale(this.size, this.size)
    ctx.drawImage(this.image, -20, -20, 40, 40)
    ctx.restore()
  }
}