
const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.setViewport({ width: 320, height: 568, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await p.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle0' });
  const res = await p.evaluate(() => new Promise((resolve) => {
    const log = [];
    const start = Date.now();
    function tick(){
      if (Date.now() - start > 10000){ resolve(log); return; }
      const pr = window.__jb && window.__jb.activePrompt;
      if (!pr || pr.hit || pr.missed){ requestAnimationFrame(tick); return; }
      const targetT = pr.fakeBeat * window.__jb.beatDur;
      const nowT = window.__jb.audioTime;
      const delta = targetT - nowT;
      if (delta <= 0.065){
        const before = { score: window.__jb.score, active: pr.def.label, promptId: pr.id };
        // SYNCHRONOUS dispatch + immediate read
        const target = document.getElementById('jbCanvasWrap') || document.body;
        const opts = { bubbles:true, cancelable:true, pointerId:1, pointerType:'touch' };
        target.dispatchEvent(new PointerEvent('pointerdown', opts));
        target.dispatchEvent(new PointerEvent('pointerup', opts));
        const after = { score: window.__jb.score, verdict: document.getElementById('jbVerdict').textContent,
          samePromptStill: window.__jb.activePrompt === pr, newActive: window.__jb.activePrompt ? window.__jb.activePrompt.def.label : null };
        log.push({ ...before, ...after, deltaMs: Math.round(delta*1000) });
        requestAnimationFrame(tick);
      } else requestAnimationFrame(tick);
    }
    jukeboxStart();
    requestAnimationFrame(tick);
  }));
  console.log(JSON.stringify(res, null, 1));
  await b.close();
})();
