function renderDragon(n) {
  if(n >= -1 && n <= 17) {
    const prevDragon = renderDragon(n-1);
    const invDragon = Array.from(prevDragon).reverse().map(turn => !turn);
    const conDragon = prevDragon.concat([true], invDragon);
    return conDragon;
  }
  return [];
}

function prepareCanvas() {
  const canvas = document.getElementById('canvas')
  const width = window.innerWidth
  const height = window.innerHeight
  canvas.width = width
  canvas.height = height
  return canvas;
}

function drawDragon(dragon, options) {
  // Internal functions
  function turnLeft(v) {
    return {x: v.y, y: (-1 * v.x)};
  }
  function turnRight(v) {
    return {x: (-1 * v.y), y: v.x};
  }
  function movePosition(pos, vector) {
    return {x: pos.x + vector.x*zoom, y: pos.y + vector.y*zoom};
  };

  // Initial vector and position
  let vector = {x: 0, y: 1};
  let pos = {x: canvas.width/2, y: canvas.height/2};

  // Fetch options
  const zoom = options.zoom;

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
  pos = movePosition(pos, vector);
  ctx.lineTo(pos.x, pos.y);
  
  for(const i in dragon) {
    const turn = dragon[i];
    vector = turn ? turnRight(vector) : turnLeft(vector);
    pos = movePosition(pos, vector);
    ctx.lineTo(pos.x, pos.y);
  }
  
  ctx.stroke();  
}

function renderOptions(inputs) {
  const options = {};
  options.zoom = inputs.zoom.value;
  options.dragon = inputs.dragon.value;
  return options
}

function drawDragonHandler() {
  const dragon = renderDragon(dragonSize)
  const options = renderOptions(inputs)
  drawDragon(dragon, options)
  if(dragonSize < options.dragon) {
    dragonSize++;
  } else {
    dragonSize = -1;
  }
}

let dragonSize = -1
const canvas = prepareCanvas();
const ctx = canvas.getContext('2d')

const inputs = {
  zoom: document.getElementById('input-zoom'),
  dragon: document.getElementById('input-dragon')
}

setInterval(drawDragonHandler, 500);