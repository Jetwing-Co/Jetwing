// terminal animation — typewriter + module counter

var container = document.getElementById('termLines');

// adds a line and returns it so we can update it later
function addLine(html) {
  var el = document.createElement('div');
  el.className = 'term-line';
  el.innerHTML = html;
  container.appendChild(el);
  return el;
}

// types text into an element one char at a time
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

// start
setTimeout(function() {

  // line 1 — typewriter
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
            typeInto(l3, '> Bypassing Hypixel... ', 35, function() {
              setTimeout(function() {
                l3.innerHTML = '> Bypassing Hypixel... <span class="success">Success</span>';
                setTimeout(function() {

                  // line 4
                  var l4 = addLine('');
                  typeInto(l4, '> Bypassing Grim... ', 35, function() {
                    setTimeout(function() {
                      l4.innerHTML = '> Bypassing Grim... <span class="success">Success</span>';
                      setTimeout(function() {

                        // line 5
                        var l5 = addLine('');
                        typeInto(l5, '> Client ready!', 45, function() {
                          setTimeout(function() {
                            addLine('');

                            // last line with cursor
                            var last = addLine('$ Play better than ever ');
                            var cur = document.createElement('span');
                            cur.className = 'cursor';
                            last.appendChild(cur);
                          }, 300);
                        });

                      }, 400);
                    }, 500);
                  });

                }, 400);
              }, 500);
            });

          }, 300);
        }
      }, 18); // 18ms per number

    }, 300);
  });

}, 300);
