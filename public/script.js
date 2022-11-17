const canvas = document.getElementById("canvas1");
// Need context to use drawing methods
const ctx = canvas.getContext("2d"); 
// Explicitly declare dimensions as same, else it defaults 
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

// Next consider how we want dynamic background speeds depending on the character
let gameSpeed = 5; 

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


// This controls our horizontal "animation"
let x = 0

// Next let's build our function that holds the animation logic
const animate = () => {
  // Clears the canvas frame at beginning of each iteration, no more "smudging" from frames being on top of each other
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // First let's draw a layer, from top left canvas and fill
  ctx.drawImage(backgroundLayer4, x, 0);
  // each loop we're drawing the image "x" px to left of canvas
  x--; 

  // Recursion to create an animation effect
  requestAnimationFrame(animate);
};
animate();