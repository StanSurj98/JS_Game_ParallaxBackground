const canvas = document.getElementById("canvas1");
// Need context to use drawing methods
const ctx = canvas.getContext("2d"); 
// Explicitly declare dimensions as same, else it defaults 
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

// Next consider how we want dynamic background speeds depending on the character
let gameSpeed = 5; 