const canvas = document.getElementById("canvas1");
// Need context to use drawing methods
const ctx = canvas.getContext("2d"); 
// Explicitly declare dimensions as same, else it defaults 
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

// Next consider how we want dynamic background speeds depending on the character
let gameSpeed = 15; 

// Source the layers from the /images folder | all are H: 720px
const backgroundLayer1 = new Image();
backgroundLayer1.src = './images/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = './images/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = './images/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = './images/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = './images/layer-5.png';


// Let's animate all layers in a programmatic way
class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.x2 = this.width; // need to start next to first image
    this.image = image;
    this.speedModifier = speedModifier;
    // This allows the layer to move at different speeds but proportionate to the global gameSpeed
    this.speed = gameSpeed * this.speedModifier; 
  }

  // Changes the horizontal position
  update(){
    // Allows game speed to be dynamically updated
    // don't need this line if you want linear speed game
    this.speed = gameSpeed * this.speedModifier;

    // This is same as before, we scroll -"2400"px in this case, reset first image taking account 2nd image's position
    if (this.x < -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 < -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }

    // This is the scroll speed of each layer 
    // same as our [ x -= gameSpeed ] variable earlier
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }
  // Responds to update and re-draws the two images
  draw(){
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

// Now let's create instances of the layer classes
const layer1 = new Layer(backgroundLayer1, 0.5);
const layer2 = new Layer(backgroundLayer2, 0.1);
const layer3 = new Layer(backgroundLayer3, 0.15); 
const layer4 = new Layer(backgroundLayer4, 0.25); 
const layer5 = new Layer(backgroundLayer5, 0.5); 

// Refactor and DRY up code - Group into an array
const gameObjects = [layer1, layer2, layer3, layer4, layer5];



// ---- Main Animation Function ----
const animate = () => {
  // Clears canvas each iteration, no "smudging" from layered frames
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Let's call forEach on the gameObjects
  gameObjects.forEach((gameObject) => {
    gameObject.update();
    gameObject.draw();
  });

  // Recursion to create an animation effect
  requestAnimationFrame(animate);
};
animate();

