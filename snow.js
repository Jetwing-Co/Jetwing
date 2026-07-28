var blueSnow = true;
var canvas = document.getElementById('snow');
var ctx = canvas.getContext('2d');

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// more particles, bigger, varying opacity
var flakes = [];
for (var i = 0; i < 160; i++) {
  flakes.push({
    x:       Math.random() * window.innerWidth,
    y:       Math.random() * window.innerHeight,
    r:       Math.random() * 3.5 + 0.8,
    speed:   Math.random() * 1.4 + 0.3,
    drift:   Math.random() * 0.6 - 0.3,
    opacity: Math.random() * 0.6 + 0.2
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < flakes.length; i++) {
    var f = flakes[i];
    var color = blueSnow
      ? 'rgba(120, 160, 255, ' + f.opacity + ')'
      : 'rgba(255, 255, 255, ' + f.opacity + ')';

    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    f.y += f.speed;
    f.x += f.drift;

    if (f.y > canvas.height) { f.y = -5; f.x = Math.random() * canvas.width; }
    if (f.x > canvas.width)  f.x = 0;
    if (f.x < 0)             f.x = canvas.width;
  }

  requestAnimationFrame(draw);
}

draw();

function toggleSnow() {
  blueSnow = !blueSnow;
  var btn = document.getElementById('snowToggle');
  btn.textContent = blueSnow ? 'White Snow' : 'Blue Snow';
}
