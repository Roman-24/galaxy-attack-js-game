class Game {
	constructor() {
	    this.canvas = document.getElementById("canvas");
        this.music=new Sound("./sounds/spacesoundtrack.mp3");
		this.music.play_started=true;	
        this.clickSound = new Sound("./sounds/spacegun.mp3");
        this.pickupSound = new Sound("./sounds/pickup.mp3");	
        this.gameoverSound = new Sound("./sounds/gameover.mp3");
        this.music.sound.volume = 0.15;
        this.gameoverSound.sound.volume = 1;
        this.pickupSound.sound.volume = 1;
        this.clickSound.sound.volume = 0.07;
        this.mousePosition = {
            x: 0,
            y: 0
        };
        this.mousePressed = false;
        this.score = 0;
        this.spawnEnemy = false;
        this.speed = 0;
        this.jednoskore = 20;
	}
    time = Date.now();
	
	onmousemove(event) {
        this.mousePosition.x = event.offsetX || event.layerX;
        this.mousePosition.y = event.offsetY || event.layerY;
    };
    onmousedown(event) {
        this.mousePressed = true;
        this.click = true;
    };
    onmouseup(event) {
        this.mousePressed = false;
        this.click = false;
    };

    ctx = canvas.getContext("2d");

    async start() {
        console.log('starting game');
        await resourceManager.init();
        console.log('resouces loaded');
        this.objects = menu(); 	
        this.time = Date.now();
        this.step();
        game.speed = 1.5;
        console.log("rýchlost na začiatku hry je " + game.speed); 	   
    }
   
    spawning() {
        if(game.spawnEnemy){
            game.objects.push(new Enemy(0));
            game.objects.push(new Enemy(1));
            game.objects.push(new Enemy(2));
            game.objects.push(new Enemy(3));
            game.objects.push(new Enemy(4));
            //console.log("spawning enemys");
        }  
    }

    vylepsi() {
        if(game.spawnEnemy){
            
            var zaakycas = Math.floor(Math.random() * 30) *1000;

            if( Math.floor(Math.random() * 11)>5){
                setTimeout(function(){ 
                    game.objects.push(new Powerup()); 
                    }, zaakycas );
            }
            else{
                setTimeout(function(){ 
                    game.objects.push(new Powerup2()); 
                    }, zaakycas );
            }
            //console.log("fungujem");
        }  
    }

    umries() {
        if(game.spawnEnemy){
            game.objects.push(new Die());
            console.log("smrt je na ceste");
        }  
    }
    
    step() {
        const now = Date.now();
        const dt = (now - this.time) / 100;
        this.time = now;
        this.move(dt);
        this.render();
        if( gameover ){ //ak sme prehrali
            this.gameoverscreen();
        }
        requestAnimationFrame(() => this.step());
    }

    removeFromScene(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax= arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        //console.log("zabil si ho");
        return arr;
    }

    gameoverscreen(){
        this.clearCtx();
            this.ctx.save();
            this.spawnEnemy = false;
            this.objects.push(new Background("background") );
            this.objects.push(new Button('menu',canvas.width/2-50,canvas.height/3+70,100,100, "home") );
            this.objects.push(new Button('sound',690,0,30,30, "sound") );	
            this.objects.forEach((koniec) => {
                koniec.draw(this.ctx);
            });
            for (var i in game.objects) {
                var obj = game.objects[i];
                if ( obj instanceof Enemy ) {
                    game.objects = game.removeFromScene(game.objects,this);
                }
            }
            this.ctx.font = '60pt Calibri';
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = 'red';
            this.ctx.fillText('Game Over', canvas.width/2, canvas.height/3);
            var x = canvas.width / 2;
            var y = 550;
            this.ctx.font = '40pt Calibri';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Tvoje dosiahnuté score: ' + this.score, x, y);
            this.ctx.restore();
            //console.log('koniec hry');
    }

    gamspeed(){
        game.speed += 1.5;
        console.log("rýchlost je " + game.speed);
    }

    move(dt) {
        this.objects.forEach((object) => {
            object.move(dt);
        });
    }
    clearCtx() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render() {
        this.clearCtx();
        this.objects.forEach((object) => {
            object.draw(this.ctx);
        });

        var x = canvas.width / 2;
        var y = 50;
        this.ctx.font = '30pt Calibri';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText('Score: ' + game.score, x, y);
    }
}