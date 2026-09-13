
const vm = require('vm');
let callsPerStep = [];
let currentStep = 0;
const tone = () => { callsPerStep[currentStep] = (callsPerStep[currentStep] || 0) + 1; };
const noise = () => { callsPerStep[currentStep] = (callsPerStep[currentStep] || 0) + 1; };
const setInterval = () => ({ active: true });
const clearInterval = (t) => { if (t) t.active = false; };
const ctx = { tone, noise, setInterval, clearInterval, console, Math };
vm.createContext(ctx);
ctx.musicOn = true;
ctx.muted = false;
ctx.musicStep = 0;
ctx.musicTimer = null;
const musicBlock = require('fs').readFileSync('/Users/russ/workspace/spoons-top-trumps/music_block_only.js','utf8');
vm.runInContext(musicBlock, ctx);
for (let i = 0; i < 128; i++) {
  currentStep = i;
  ctx.musicTick();
}
const activeSteps = callsPerStep.filter(c => c > 0).length;
const zeroSteps = callsPerStep.filter(c => c === 0).length;
const maxCalls = Math.max(...callsPerStep);
const minActive = Math.min(...callsPerStep.filter(c => c > 0));
const total = callsPerStep.reduce((a,b)=>a+b,0);
console.log(JSON.stringify({ activeSteps, zeroSteps, maxCalls, minActive, total, callsPerStep }));
