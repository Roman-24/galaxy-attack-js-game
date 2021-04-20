
class Enemy {
    constructor(koef) {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('enemy');
        this.x = canvas.width*koef/5+233/3 //každý iné
        this.y = 0
        this.dy = 1.5;
        this.size = 2.5;
        this.life = 100;
    }
    move(dt) {
        const canvas = this.canvas;
        if( this.y > canvas.height-50 ){
          game.enemyLife =0;
          for (var i in game.objects) {
            var obj = game.objects[i];
            if ( obj instanceof Enemy ) {
                game.objects = game.removeFromScene(game.objects,this);
            } 
          }
        }
        // Movement
        this.x += 0 * dt
        //this.y += (this.dy * dt) + game.speed
        this.y += this.dy + game.speed;
        this.checkCollision();
    }
    checkCollision(){
        for (var i in game.objects) {
            var obj = game.objects[i];
            if ( obj instanceof Projectile ) {
              if( this.x+35 >= obj.x-35 && this.x-35 <= obj.x+35 && this.y+35 >= obj.y-35 && this.y-35 <= obj.y+35 ){
                game.score += game.jednoskore;
                game.objects = game.removeFromScene(game.objects,this);
                game.enemyLife -=1;
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






//smrtiaca vec
class Die {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.image = resourceManager.getImageSource('smrt');
    this.x = Math.random() * canvas.width
    this.y = 0;
    this.dy = 2 + Math.random();
  }
  move(dt) {
      const canvas = this.canvas;
      // Movement
      this.y += this.dy + (game.speed*3/4);
      this.checkCollision();
      if( this.y > canvas.height-50){
        game.removeFromScene(game.objects,this);
      }

  }
  checkCollision(){
      for (var i in game.objects) {
          var obj = game.objects[i];
          if ( obj instanceof Player ) {
            if( this.x+35 >= obj.x-35 && this.x-35 <= obj.x+35 && this.y+28 >= obj.y-28 && this.y-28 <= obj.y+28 ){
              //game.objects = game.removeFromScene(game.objects,this);
              gameover = true; 
            }
          } 
      }
  };
  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.scale(this.size, this.size)
    ctx.drawImage(this.image, -50, -50, 100, 100)
    ctx.restore()
  }
}