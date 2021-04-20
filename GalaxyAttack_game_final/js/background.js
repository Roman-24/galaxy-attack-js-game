class Background {
    constructor(backgroundName) {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource(backgroundName); 
    }
    move(dt) {  //nesmieme vymazať
    }
    draw(ctx) {
      ctx.save()     
      ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height)  
      ctx.restore()
    }
}