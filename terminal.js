var container = document.getElementById('termLines');

function addLine(html) {
  var el = document.createElement('div');
  el.className = 'term-line';
  el.innerHTML = html;
  container.appendChild(el);
  return el;
}

function typeInto(el, text, speed, done) {
  var i = 0;
  var t = setInterval(function() {
    el.innerHTML = text.slice(0, i);
    i++;
    if (i > text.length) {
      clearInterval(t);
      if (done) done();
    }
  }, speed);
}

setTimeout(function() {

  // line 1
  var l1 = addLine('');
  typeInto(l1, '> JetWing Client v3.0', 45, function() {
    setTimeout(function() {

      // line 2 — count from 1 to 129
      var l2 = addLine('> Loading modules... [0/129]');
      var n = 0;
      var counter = setInterval(function() {
        n++;
        l2.innerHTML = '> Loading modules... [' + n + '/129]';
        if (n >= 129) {
          clearInterval(counter);
          setTimeout(function() {

            // line 3
            var l3 = addLine('');
            typeInto(l3, '> Silent flags... ', 35, function() {
              setTimeout(function() {
                l3.innerHTML = '> Silent flags... <span class="success">bypassed successfully</span>';
                setTimeout(function() {

                  // line 4
                  var l4 = addLine('');
                  typeInto(l4, '> Client ready!', 45, function() {
                    setTimeout(function() {
                      addLine('');

                      // last line with cursor
                      var last = addLine('');
                      typeInto(last, 'Bye bye watchdog ', 45, function() {
                        var cur = document.createElement('span');
                        cur.className = 'cursor';
                        last.appendChild(cur);
                      });

                    }, 300);
                  });

                }, 400);
              }, 500);
            });

          }, 300);
        }
      }, 18);

    }, 300);
  });

}, 300);
