// terminal typing animation
// lines array — edit these to change what the terminal says
var lines = [
  { text: '> JetWing Client v3.0',      delay: 0    },
  { text: '> Loading modules... ',       delay: 600  },
  { text: '> Loading modules... [252/252]', delay: 1400, replace: true },
  { text: '> Bypassing Hypixel... ',     delay: 2200 },
  { text: '> Bypassing Hypixel... <span class="success">Success</span>', delay: 3000, replace: true },
  { text: '> Bypassing Grim... ',        delay: 3600 },
  { text: '> Bypassing Grim... <span class="success">Success</span>',    delay: 4400, replace: true },
  { text: '> Client ready!',             delay: 5200 },
  { text: '',                            delay: 5800 },
  { text: '$ Play better than ever _',  delay: 6200, cursor: true },
];

var container = document.getElementById('termLines');

// go through each line and add it after its delay
lines.forEach(function(line, i) {
  setTimeout(function() {

    if (line.replace) {
      // replace the last line instead of adding a new one
      var all = container.querySelectorAll('.term-line');
      var last = all[all.length - 1];
      if (last) last.innerHTML = line.text;
      return;
    }

    var el = document.createElement('div');
    el.className = 'term-line';
    el.innerHTML = line.text;

    // add blinking cursor on the last line
    if (line.cursor) {
      var cur = document.createElement('span');
      cur.className = 'cursor';
      el.appendChild(cur);
    }

    container.appendChild(el);

  }, line.delay);
});
