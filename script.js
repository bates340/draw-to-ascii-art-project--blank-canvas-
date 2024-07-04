const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const asciiOutput = document.getElementById('ascii-output');
const clearBtn = document.getElementById('clear');
const generateBtn = document.getElementById('generate');
const brushSizeSelector = document.getElementById('brush-size');

let isDrawing = false;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function startDrawing(e) {
  isDrawing = true;
  draw(e);
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}

function draw(e) {
  if (!isDrawing) return;

  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';

  ctx.lineTo((e.clientX - canvas.offsetLeft) * (canvas.width / canvas.offsetWidth), 
              (e.clientY - canvas.offsetTop) * (canvas.height / canvas.offsetHeight));
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo((e.clientX - canvas.offsetLeft) * (canvas.width / canvas.offsetWidth), 
             (e.clientY - canvas.offsetTop) * (canvas.height / canvas.offsetHeight));
}

function clearCanvas() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  asciiOutput.textContent = 'You just cleared the whole canvas!';
}

function generateASCII() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const ascii = [];
  const asciiChars = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.'];

  for (let y = 0; y < canvas.height; y++) {
    let row = '';
    for (let x = 0; x < canvas.width; x++) {
      const pixelIndex = (y * canvas.width + x) * 4;
      const r = imageData.data[pixelIndex];
      const g = imageData.data[pixelIndex + 1];
      const b = imageData.data[pixelIndex + 2];
      const brightness = (r + g + b) / 3;
      const charIndex = Math.floor(brightness / 25);
      row += asciiChars[charIndex] || ' ';
    }
    ascii.push(row);
  }

  asciiOutput.textContent = ascii.join('\n');
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

clearBtn.addEventListener('click', clearCanvas);
generateBtn.addEventListener('click', generateASCII);