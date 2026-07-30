// ── JetWing Sound Engine ──
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let ctx;

function getCtx() {
  if (!ctx) ctx = new AudioCtx();
  return ctx;
}

// Whoosh — for shooting stars
function playWhoosh() {
  const ac = getCtx();
  const bufferSize = ac.sampleRate * 0.6;
  const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
  }
  const source = ac.createBufferSource();
  source.buffer = buffer;

  const filter = ac.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(800, ac.currentTime);
  filter.frequency.exponentialRampToValueAtTime(200, ac.currentTime + 0.5);
  filter.Q.value = 1.2;

  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.18, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.55);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ac.destination);
  source.start();
}

// Click — for button clicks
function playClick() {
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(600, ac.currentTime + 0.04);

  gain.gain.setValueAtTime(0.15, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.06);

  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + 0.06);
}

// Creamy keypress — for typewriter
function playKey() {
  const ac = getCtx();

  // Soft thump (low body)
  const osc = ac.createOscillator();
  const oscGain = ac.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(180, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ac.currentTime + 0.05);
  oscGain.gain.setValueAtTime(0.12, ac.currentTime);
  oscGain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.07);
  osc.connect(oscGain);
  oscGain.connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + 0.07);

  // Soft click top layer
  const bufSize = Math.floor(ac.sampleRate * 0.03);
  const buf = ac.createBuffer(1, bufSize, ac.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) {
    d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 3);
  }
  const noise = ac.createBufferSource();
  noise.buffer = buf;
  const noiseFilter = ac.createBiquadFilter();
  noiseFilter.type = 'highpass';
  noiseFilter.frequency.value = 4000;
  const noiseGain = ac.createGain();
  noiseGain.gain.setValueAtTime(0.06, ac.currentTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.03);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ac.destination);
  noise.start();
}

// Attach click sound to all buttons and nav links
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('click', playClick);
  });
});
