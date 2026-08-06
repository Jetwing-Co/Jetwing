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

  var l1 = addLine('');
  typeInto(l1, '> Jetsidian Client v3.0', 45, function() {
    setTimeout(function() {

      var l2 = addLine('> Loading modules... [0/129]');
      var n = 0;
      var counter = setInterval(function() {
        n++;
        l2.innerHTML = '> Loading modules... [' + n + '/129]';
        if (n >= 129) {
          clearInterval(counter);
          setTimeout(function() {

            var l3 = addLine('');
            typeInto(l3, '> Checking for anticheats... ', 35, function() {
              setTimeout(function() {
                l3.innerHTML = '> Checking for anticheats... <span class="warn">found 3</span>';
                setTimeout(function() {

                  var l4 = addLine('');
                  typeInto(l4, '> Bypassing Watchdog... ', 35, function() {
                    setTimeout(function() {
                      l4.innerHTML = '> Bypassing Watchdog... <span class="success">too easy</span>';
                      setTimeout(function() {

                        var l5 = addLine('');
                        typeInto(l5, '> Bypassing Grim... ', 35, function() {
                          setTimeout(function() {
                            l5.innerHTML = '> Bypassing Grim... <span class="success">lol ok</span>';
                            setTimeout(function() {

                              var l6 = addLine('');
                              typeInto(l6, '> Bypassing Matrix... ', 35, function() {
                                setTimeout(function() {
                                  l6.innerHTML = '> Bypassing Matrix... <span class="success">done</span>';
                                  setTimeout(function() {

                                    var l7 = addLine('');
                                    typeInto(l7, '> Silent flags... ', 35, function() {
                                      setTimeout(function() {
                                        l7.innerHTML = '> Silent flags... <span class="success">bypassed successfully</span>';
                                        setTimeout(function() {

                                          var l8 = addLine('');
                                          typeInto(l8, '> Saying hi to Simon... ', 35, function() {
                                            setTimeout(function() {
                                              l8.innerHTML = '> Saying hi to Simon... <span class="warn">no response (as usual)</span>';
                                              setTimeout(function() {

                                                var l9 = addLine('');
                                                typeInto(l9, '> Client ready!', 45, function() {
                                                  setTimeout(function() {
                                                    addLine('');
                                                    var last = addLine('');
                                                    typeInto(last, 'Bye bye watchdog ', 45, function() {
                                                      var cur = document.createElement('span');
                                                      cur.className = 'cursor';
                                                      last.appendChild(cur);
                                                    });
                                                  }, 300);
                                                });

                                              }, 400);
                                            }, 600);
                                          });

                                        }, 400);
                                      }, 500);
                                    });

                                  }, 400);
                                }, 500);
                              });

                            }, 400);
                          }, 500);
                        });

                      }, 400);
                    }, 500);
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
