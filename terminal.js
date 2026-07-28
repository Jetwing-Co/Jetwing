var container = document.getElementById('termLines');

var lines = [
  { text: '> JetWing Client v3.0',      delay: 0    },
  { text: '> Loading modules... ',       delay: 600  },
  { text: '> Loading modules... [129/129]', delay: 1400, replace: true },
  { text: '> Silent flags... ',          delay: 2200 },
  { text: '> Silent flags... <span class="success">bypassed successfully</span>', delay: 3000, replace: true },
  { text: '> Client ready!',             delay: 3800 },
  { text: '',                            delay: 4400 },
  { text: '$ Bye bye watchdog ',         delay: 4800, cursor: true },
];

lines.forEach(function(line, i) {
  setTimeout(function() {

    if (line.replace) {
      var all = container.querySelectorAll('.term-line');
      var last = all[all.length - 1];
      if (last) last.innerHTML = line.text;
      return;
    }

    var el = document.createElement('div');
    el.className = 'term-line';
    el.innerHTML = line.text;

    if (line.cursor) {
      var cur = document.createElement('span');
      cur.className = 'cursor';
      el.appendChild(cur);
    }

    container.appendChild(el);

  }, line.delay);
});
