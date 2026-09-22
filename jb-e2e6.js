
const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.setViewport({ width: 320, height: 568, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await p.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle0' });
  const res = await p.evaluate(() => new Promise((resolve) => {
    const log = [];
    const start = Date.now();
    function fireTap(){
      const target = document.getElementById('jbCanvasWrap') || document.body;
      const opts = { bubbles:true, cancelable:true, pointerId:1, pointerType:'touch' };
      target.dispatchEvent(new PointerEvent('pointerdown', opts));
      target.dispatchEvent(new PointerEvent('pointerup', opts));
    }
    function tick(){
      if (Date.now() - start > 14000){ resolve(log); return; }
      const pr = window.__jb && window.__jb.activePrompt;
      if (!pr || pr.hit || pr.missed){ requestAnimationFrame(tick); return; }
      const targetT = pr.fakeBeat * window.__jb.beatDur;
      const nowT = window.__jb.audioTime;
      const delta = targetT - nowT;
      if (delta <= 0.065){
        log.push({ action: pr.def.label, target: +targetT.toFixed(3), now: +nowT.toFixed(3),
          deltaMs: Math.round(delta*1000), beatDur: window.__jb.beatDur, bpm: window.__jb.bpm,
          trackIdx: window.__jb.trackIdx, isBallad: window.__jb.isBallad });
        fireTap();
        setTimeout(() => { log[log.length-1].verdict = document.getElementById('jbVerdict').textContent; requestAnimationFrame(tick); }, 90);
      } else requestAnimationFrame(tick);
    }
    jukeboxStart();
    requestAnimationFrame(tick);
  }));
  console.log(JSON.stringify(res, null, 1));
  await b.close();
})();
