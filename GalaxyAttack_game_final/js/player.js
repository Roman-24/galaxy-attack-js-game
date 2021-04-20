class Projectile  {
  constructor(x, y) {
    this.canvas = document.getElementById("canvas");
    this.img = resourceManager.getImageSource('projectile');
    this.game = game.objects
    this.x = x
    this.y = y
    this.width = 90
    this.height = 90
    this.dx = 0
    this.dy = -40
  }
  move(dt) {
      // this.x += this.dx * dt
      this.y += this.dy * dt;
      for (var i in game.objects) {
        if ( game.objects[i] instanceof Projectile ) {
          if( game.objects[i].y  < 100 ){
            game.objects = game.removeFromScene(game.objects,this);     
          }
        } 
      }
  }
  draw(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.drawImage(this.img, -40, -60, this.width, this.height)
    ctx.restore()
  }  
}




class Player {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('player');
        this.x = canvas.width/2
        this.y = canvas.height-100
        this.rof = 90;
        this.fireTimer = false;
        this.who = Projectile;
    }

    move(dt) {
		  this.x = game.mousePosition.x;
      //this.y = game.mousePosition.y;
      if(game.mousePressed && gameover == 0){
        game.clickSound.play();
        this.startFiring();
      }
      else{
        this.stopFiring();
      }

      if( game.mousePosition.x <= 0 ){
        this.x = 0;
      }
      if( game.mousePosition.x >= this.canvas.width ){
        this.x = canvas.width;
      }

      this.who = Enemy;
      if( this.checkCollision(game, this.who) ){
        game.gameoverSound.play();
        //console.log("boom");
        gameover = 1;
      }

      this.who = Powerup;
      if(this.checkCollision(game, this.who)){
        game.pickupSound.play();
        console.log("power up 1 ");
        this.rof = 45;
        setTimeout(function(){ 
        console.log("power up 1 koniec ");
        this.rof = 90; }, 10000);
      }

      this.who = Powerup2;
      if(this.checkCollision(game, this.who)){
        game.pickupSound.play();
        console.log("power up 2 ");
        game.jednoskore =20;
        setTimeout(function(){ 
        console.log("power up 2 koniec ");
        game.jednoskore =10; }, 10000);
      }
    }


    startFiring() {
      if (this.fireTimer) return
      var player = this
      this.fireTimer = setInterval(function() {player.fire()}, this.rof)
    }
    stopFiring() {
      if (!this.fireTimer) return
      clearInterval(this.fireTimer)
      this.fireTimer = false
    }
    fire() {
      var bullet = new Projectile( this.x , this.y);
      game.objects.push(bullet);
    }

    checkCollision( game, who ){
      for (var i in game.objects) {
          var obj = game.objects[i];
          if ( obj instanceof who ) {
            if( this.x <= obj.x + 100 && this.x + 100 >=obj.x && obj.y >= canvas.height-150 ){
              return true;
            }
          } 
      }
      return false;
    };

    draw(ctx) {
      ctx.save()
      ctx.translate(this.x, this.y)     
      ctx.drawImage(this.image, -50, -50, 100, 100)
      ctx.restore()
    }
}