const canvas = document.getElementById("canvas1");
// Need context to use drawing methods
const ctx = canvas.getContext("2d"); 
// Explicitly declare dimensions as same, else it defaults 
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;


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

// Global Dynamic GameSpeed
let gameSpeed = 10;
// Global GameFrame - adjusts the layer's "x" positions and updated each animation
let gameFrame = 0;

// Speed Slider on HTML
const slider = document.getElementById('slider');
slider.value = gameSpeed; // Init value
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gameSpeed;

// Responsive Slider | use "input" not "change" here for immediate response
slider.addEventListener("input", (e) => {
  gameSpeed = e.target.value; // on input, update the gameSpeed & text
  showGameSpeed.innerHTML = gameSpeed;
});


// Animate all layers in a programmatic way
class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.image = image;
    this.speedModifier = speedModifier;
    // Layer have different speeds but proportionate to global gameSpeed
    this.speed = gameSpeed * this.speedModifier; 
  }

  // Changes the horizontal position
  update(){
    // Allows game speed to be dynamically updated
    // don't need this line if you want linear speed game
    this.speed = gameSpeed * this.speedModifier;

    // Similar to before, this ensures that the x-position is somewhere always between 0 and this.width (2400px)
    this.x = gameFrame * this.speed % this.width;

    // // If the first image at x = 0, scrolls its entirety, reset to x = 0 
    // if (this.x <= -this.width) {
    //   this.x = 0;
    // }

    // // Scroll speed of each layer | constantly re-adjust x pixels according to speed
    // this.x = Math.floor(this.x - this.speed);
  }

  // Responds to update and re-draws the two images
  draw(){
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    // 2nd image is ALWAYS 2400px to the right of the first 
    // Also, ONLY the INITIAL frame of 800px will ever get seen before the first image resets both to x = 0, "x2" = 2400px
  }
}

// Now let's create instances of the layer classes
const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6); 
const layer4 = new Layer(backgroundLayer4, 0.8); 
const layer5 = new Layer(backgroundLayer5, 1); 

// Refactor and DRY up code - Group into an array
const gameObjects = [layer1, layer2, layer3, layer4, layer5];



// ---- Main Animation Function ----
const animate = () => {
  // Clears canvas each iteration, no "smudging" from layered frames
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // forEach gameObject invoke their instance methods
  gameObjects.forEach((gameObject) => {
    gameObject.update();
    gameObject.draw();
  });

  gameFrame--;

  // Recursion to create an animation effect
  requestAnimationFrame(animate);
};
animate();

