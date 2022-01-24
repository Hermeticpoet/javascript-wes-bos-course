// select the elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakeBtn = document.querySelector('.shake');
const MOVE_AMOUNT = 15;

// set up canvas for drawing
/// make variables called width & Height from same properties on our canvas
const { width } = canvas;
const { height } = canvas;

// create random values for x & y on the canvas
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath(); // start the drawing marker somewhere...
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// write a draw function - use options object as parameter & destructer it
function draw({ key }) {
  // increment the hue & update stroke
  hue += 6;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // must explicitly restate stroke value that has been updated
  console.log(key);
  // start the path
  ctx.beginPath();
  ctx.moveTo(x, y);
  // move our x & y depending on user input
  switch (key) {
    case 'ArrowUp':
      y -= MOVE_AMOUNT;
      break;
    case 'ArrowDown':
      y += MOVE_AMOUNT;
      break;
    case 'ArrowLeft':
      x -= MOVE_AMOUNT;
      break;
    case 'ArrowRight':
      x += MOVE_AMOUNT;
      break;

    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

// write a handler for the keys
function handleKey(e) {
  if (e.key.includes('Arrow')) {
    e.preventDefault();
    draw({ key: e.key });
    // console.log(e.key);
    // console.log('handling key');
  }
}

// clear / shake function
function clearCanvas() {
  canvas.classList.add('shake');
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    'animationend',
    () => {
      console.log('Done the shake...');
      canvas.classList.remove('shake');
    },
    { once: true }
  );
}

// listen for arrow keys
window.addEventListener('keydown', handleKey);

// listen for shake btn click
shakeBtn.addEventListener('click', clearCanvas);
