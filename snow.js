var blueSnow = true;
var canvas = document.getElementById('snow');
var ctx = canvas.getContext('2d');

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

var flakes = [];
for (var i = 0; i < 120; i++) {
  flakes.push({
    x:       Math.random() * window.innerWidth,
    y:       Math.random() * window.innerHeight,
    r:       Math.random() * 3 + 0.8,
    speed:   Math.random() * 1.2 + 0.3,
    drift:   Math.random() * 0.5 - 0.25,
    opacity: Math.random() * 0.5 + 0.2
  });
}

var stars = [];
for (var i = 0; i < 80; i++) {
  stars.push({
    x:       Math.random() * window.innerWidth,
    y:       Math.random() * window.innerHeight,
    r:       Math.random() * 1.5 + 0.3,
    opacity: Math.random(),
    speed:   Math.random() * 0.02 + 0.005,
    dir:     Math.random() > 0.5 ? 1 : -1
  });
}

var shooters = [];
function spawnShooter() {
  shooters.push({
    x:       Math.random() * window.innerWidth,
    y:       Math.random() * window.innerHeight * 0.5,
    len:     Math.random() * 120 + 60,
    speed:   Math.random() * 8 + 5,
    opacity: 1
  });
  if (typeof playWhoosh === 'function') playWhoosh();
}
setInterval(spawnShooter, 3000);

var mouse = { x: 0, y: 0 };
var trail = [];
window.addEventListener('mousemove', function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  for (var i = 0; i < 3; i++) {
    trail.push({
      x:       mouse.x + (Math.random() - 0.5) * 10,
      y:       mouse.y + (Math.random() - 0.5) * 10,
      r:       Math.random() * 3 + 1,
      opacity: 0.8,
      vx:      (Math.random() - 0.5) * 1.5,
      vy:      (Math.random() - 0.5) * 1.5 - 0.5
    });
  }
});

var orb = document.getElementById('orb');
var orbX = 0, orbY = 0;
var targetX = 0, targetY = 0;

window.addEventListener('mousemove', function(e) {
  targetX = e.clientX;
  targetY = e.clientY;
});

function moveOrb() {
  orbX += (targetX - orbX) * 0.06;
  orbY += (targetY - orbY) * 0.06;
  orb.style.left = orbX + 'px';
  orb.style.top  = orbY + 'px';
  requestAnimationFrame(moveOrb);
}
moveOrb();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < stars.length; i++) {
    var s = stars[i];
    s.opacity += s.speed * s.dir;
    if (s.opacity >= 1) { s.opacity = 1; s.dir = -1; }
    if (s.opacity <= 0) { s.opacity = 0; s.dir = 1; }
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, ' + s.opacity + ')';
    ctx.fill();
  }

  for (var i = shooters.length - 1; i >= 0; i--) {
    var sh = shooters[i];
    ctx.beginPath();
    ctx.moveTo(sh.x, sh.y);
    ctx.lineTo(sh.x - sh.len, sh.y - sh.len * 0.3);
    ctx.strokeStyle = 'rgba(180, 160, 255, ' + sh.opacity + ')';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    sh.x += sh.speed;
    sh.y += sh.speed * 0.3;
    sh.opacity -= 0.015;
    if (sh.opacity <= 0) shooters.splice(i, 1);
  }

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

  for (var i = trail.length - 1; i >= 0; i--) {
    var p = trail[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(160, 100, 255, ' + p.opacity + ')';
    ctx.fill();
    p.x  += p.vx;
    p.y  += p.vy;
    p.r  *= 0.94;
    p.opacity -= 0.04;
    if (p.opacity <= 0) trail.splice(i, 1);
  }

  requestAnimationFrame(draw);
}

draw();

function toggleSnow() {
  blueSnow = !blueSnow;
  var btn = document.getElementById('snowToggle');
  btn.textContent = blueSnow ? 'White Snow' : 'Blue Snow';
}

window.addEventListener('load', function() {
  setTimeout(function() {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});
