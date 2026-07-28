// snow particle system
// blueSnow = true means blue tinted, false means white

var blueSnow = true;

var canvas = document.getElementById('snow');
var ctx = canvas.getContext('2d');

// resize canvas to fill screen
function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// create 120 snowflakes with random positions/sizes/speeds
var flakes = [];
for (var i = 0; i < 120; i++) {
  flakes.push({
    x:     Math.random() * window.innerWidth,
    y:     Math.random() * window.innerHeight,
    r:     Math.random() * 2.5 + 0.5,   // radius 0.5–3px
    speed: Math.random() * 1.2 + 0.3,   // fall speed
    drift: Math.random() * 0.5 - 0.25   // slight sideways drift
  });
}

// draw and move every frame
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // pick color based on toggle
  ctx.fillStyle = blueSnow ? 'rgba(120, 160, 255, 0.7)' : 'rgba(255, 255, 255, 0.75)';

  for (var i = 0; i < flakes.length; i++) {
    var f = flakes[i];

    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fill();

    // move down and drift sideways
    f.y += f.speed;
    f.x += f.drift;

    // wrap back to top when off screen
    if (f.y > canvas.height) {
      f.y = -5;
      f.x = Math.random() * canvas.width;
    }
    if (f.x > canvas.width)  f.x = 0;
    if (f.x < 0)             f.x = canvas.width;
  }

  requestAnimationFrame(draw);
}

draw();

// called by the toggle button
function toggleSnow() {
  blueSnow = !blueSnow;
  var btn = document.getElementById('snowToggle');
  btn.textContent = blueSnow ? 'White Snow' : 'Blue Snow';
}
