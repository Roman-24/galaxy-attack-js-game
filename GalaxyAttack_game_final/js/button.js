class Button {
    constructor(id ,x, y , width, height, imgName) {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource(imgName);
        this.x = x
        this.y = y 
		this.width = width
        this.height = height  		
		this.id=id;	
    }
	move(dt) {
		if(game.mousePosition.x>this.x && game.mousePosition.y>this.y && game.mousePosition.x<(this.x+this.width) && game.mousePosition.y<(this.y+this.height)) {
			if(game.mousePressed) {
				if(this.id=='level') {
					if(game.music.play_started) game.music.play();
						game.speed = 0.1;
						game.objects = level();
						game.mousePressed=false;
				}
				if(this.id=='menu') {
					game.objects = menu();
					gameover = 0;
					game.spawnEnemy = false;
					game.mousePressed = false;
					location.reload();
				} 
				if(this.id=='instructions') {
					game.objects = instructions();
					game.mousePressed=false;
					game.spawnEnemy = false;
				}
				if(this.id=='sound') {
					if(game.music.play_started) {
						game.music.stop();
						game.music.sound.volume = 0;
						game.gameoverSound.sound.volume = 0;
						game.pickupSound.sound.volume = 0;
						game.clickSound.sound.volume = 0;
					}
					else{ 
						game.music.play();		
						game.music.sound.volume = 0.15;
						game.gameoverSound.sound.volume = 1;
						game.pickupSound.sound.volume = 1;
						game.clickSound.sound.volume = 0.07;
					}
					game.mousePressed=false;				
				} 
			}  
		}
	}
    draw(ctx) {
    	ctx.save()    
    	ctx.drawImage(this.image,this.x, this.y, this.width, this.height )  
    	ctx.restore()
    }
}