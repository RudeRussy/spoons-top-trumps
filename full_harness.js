
const vm = require('vm');
const fs = require('fs');

const timers = [];
let callsPerStep = [];
let currentStep = 0;
let toneCalls = [];
let noiseCalls = [];

function setInterval(fn, ms) {
  const id = { fn, ms, active: true, ref: timers.length };
  timers.push(id);
  return id;
}
function clearInterval(id) {
  if (id && timers[id.ref]) timers[id.ref].active = false;
}
function setTimeout() {}
function clearTimeout() {}

const localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
const location = { origin: 'http://example.com', pathname: '/' };
function noop() {}
function makeEl() {
  return {
    addEventListener: noop,
    removeEventListener: noop,
    classList: { add:noop, remove:noop, toggle:noop, contains:()=>false },
    textContent: '', innerHTML: '', value: '', style: {}, dataset: {},
    disabled: false, checked: false, play() { return { catch:noop }; },
    focus:noop, blur:noop, click:noop, setAttribute:noop, getAttribute() { return null; }
  };
}
const document = {
  addEventListener: noop,
  getElementById() { return makeEl(); },
  createElement() { return makeEl(); },
  querySelector() { return makeEl(); },
  querySelectorAll() { return []; }
};

// Stub AudioContext with minimal needed for ac() and tone/noise to run.
let audioCalls = [];
class StubAudioContext {
  get currentTime() { return 0; }
  get sampleRate() { return 48000; }
  get state() { return 'running'; }
  resume() { return Promise.resolve(); }
  createOscillator() {
    return {
      type: 'square',
      frequency: { setValueAtTime(){} },
      connect(){},
      start(){}, stop(){}
    };
  }
  createGain() {
    return {
      gain: { setValueAtTime(){}, exponentialRampToValueAtTime(){} },
      connect(){}
    };
  }
  createBuffer(ch, len, sr) {
    return { getChannelData() { return new Float32Array(len); }, length: len };
  }
  createBufferSource() {
    return { buffer: null, connect(){}, start(){} };
  }
  get destination() { return {}; }
}
const window = {
  addEventListener: noop,
  removeEventListener: noop,
  AudioContext: StubAudioContext, webkitAudioContext: StubAudioContext,
  localStorage, location,
  peerObj: null, connObj: null,
  __wireNet() {},
  __errs: []
};
const navigator = {};
let globalThisObj = { window, document, localStorage, location, navigator, console, Math, Date };
globalThisObj.setInterval = setInterval;
globalThisObj.clearInterval = clearInterval;
globalThisObj.setTimeout = setTimeout;
globalThisObj.clearTimeout = clearTimeout;

function tone(freq, dur, type, gain) {
  callsPerStep[currentStep] = (callsPerStep[currentStep] || 0) + 1;
  toneCalls.push({step: currentStep, freq, dur, type, gain});
}
function noise(dur, gain) {
  callsPerStep[currentStep] = (callsPerStep[currentStep] || 0) + 1;
  noiseCalls.push({step: currentStep, dur, gain});
}
globalThisObj.tone = tone;
globalThisObj.noise = noise;
globalThisObj.Peer = undefined;
globalThisObj.fetch = undefined;
globalThisObj.FART_FILES = [];
globalThisObj.SILENT_WAV = '';

let src = fs.readFileSync('/Users/russ/workspace/spoons-top-trumps/extracted_sub.js','utf8');
src += '\nglobalThis.AudioFX = AudioFX;\n';

vm.createContext(globalThisObj);
vm.runInContext(src, globalThisObj, { filename: 'extracted_sub.js' });
const AudioFX = globalThisObj.AudioFX;

callsPerStep = [];
currentStep = 0;
AudioFX.unlock();
AudioFX.startMusic();
console.log('timers after startMusic:', timers.length);
const t = timers[timers.length - 1];
if (!t) { console.log('NO TIMER'); process.exit(1); }
for (let i = 0; i < 128; i++) {
  currentStep = i;
  t.fn();
}
const activeSteps = callsPerStep.filter(c => c > 0).length;
const zeroSteps = callsPerStep.filter(c => c === 0).length;
const maxCalls = Math.max(...callsPerStep);
const minActive = Math.min(...callsPerStep.filter(c => c > 0));
const total = callsPerStep.reduce((a,b)=>a+b,0);

const before = t.active;
AudioFX.stopMusic();
const after = t.active;

const stepGains = {};
for (const c of toneCalls) stepGains[c.step] = (stepGains[c.step] || 0) + (c.gain || 0);
for (const c of noiseCalls) stepGains[c.step] = (stepGains[c.step] || 0) + (c.gain || 0);
const peakGain = Math.max(...Object.values(stepGains));
const minGainStep = Math.min(...Object.values(stepGains));

console.log(JSON.stringify({ activeSteps, zeroSteps, maxCalls, minActive, total, peakGain, minGainStep, timerCleared: before && !after }));
