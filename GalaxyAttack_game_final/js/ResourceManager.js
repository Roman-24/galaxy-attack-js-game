const IMAGES = [
    {name: 'enemy', src: 'img/nepriatel.png'},
    {name: 'player', src: 'img/hrac.png'},
	{name: 'background', src: 'img/pozadie.png'},
	{name: 'play', src: 'img/play.png'},
	{name: 'background2', src: 'img/background2.png'},
	{name: 'instructions', src: 'img/instructions.png'},
	{name: 'home', src: 'img/home.png'},
    {name: 'sound', src: 'img/sound-btn.png'},
    {name: 'projectile', src: 'img/projectile.png'},
    {name: 'powerup', src: 'img/star-power.png'},
    {name: 'powerup2', src: 'img/powerup-wallpaper-7.jpg'},
    {name: 'smrt', src: 'img/smrt.png'}, 
];
class ResourceManager {
    loadedImages = new Map();
    async init() {
        await this.loadImages();
    }
    async loadImages() {
        await Promise.all( IMAGES.map(image => this.loadImage(image)),)
    }
    async loadImage(imgResource) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = imgResource.src;			
            img.onload = () => {
                this.loadedImages.set(imgResource.name, img);
                resolve(img);
            }
            img.onerror = (err) => {
                reject(err);
            }
        });
    }
    getImageSource(imageName) {
        const image = this.loadedImages.get(imageName);
        return image;
    }
}