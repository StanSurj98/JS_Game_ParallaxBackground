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
    this.x2 = this.width; // need to start next to first image
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

    // Same as before, scroll -2400px in this case, reset first image taking account 2nd image's position
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

  // Recursion to create an animation effect
  requestAnimationFrame(animate);
};
animate();

