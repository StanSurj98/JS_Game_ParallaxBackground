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


// This controls our horizontal "animation"
let x = 0;
let x2 = 2400;


const animate = () => {
  // Clears canvas each iteration, no "smudging" from layered frames
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.drawImage(backgroundLayer4, x, 0);
  // To prevent big gap, stack another image in front
  ctx.drawImage(backgroundLayer4, x2, 0);

  // Resetting the images after it scrolls the full length
  if (x < -2400) x = 2400 - gameSpeed; // offset the position by gameSpeed, decreases the black gap in /b/
  else x -= gameSpeed;

  // Reset the position of the 2nd image
  if (x2 < -2400) x2 = 2400 - gameSpeed; // this is because one image is always on screen while the other resets
  else x2 -= gameSpeed;

  // Recursion to create an animation effect
  requestAnimationFrame(animate);
};
animate();