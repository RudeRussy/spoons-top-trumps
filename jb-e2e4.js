
const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.setViewport({ width: 320, height: 568, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await p.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle0' });
  const res = await p.evaluate(() => new Promise((resolve) => {
    const taps = [];
    const start = Date.now();
    function fireTap(){
      const target = document.getElementById('jbCanvasWrap') || document.body;
      const opts = { bubbles:true, cancelable:true, pointerId:1, pointerType:'touch' };
      target.dispatchEvent(new PointerEvent('pointerdown', opts));
      target.dispatchEvent(new PointerEvent('pointerup', opts));
    }
    function tick(){
      if (Date.now() - start > 16000){ resolve({ done:true, taps, score: window.__jb.score, combo: window.__jb.combo }); return; }
      const pr = window.__jb && window.__jb.activePrompt;
      if (!pr || pr.hit || pr.missed){ setTimeout(tick, 40); return; }
      const targetT = pr.fakeBeat * window.__jb.beatDur;
      const nowT = window.__jb.audioTime;
      const sleep = Math.max(0, Math.min(3000, (targetT - nowT - 0.06) * 1000));
      const before = { score: window.__jb.score, verdict: document.getElementById('jbVerdict').textContent, action: document.getElementById('jbAction').textContent };
      setTimeout(() => {
        fireTap();
        setTimeout(() => {
          const after = { score: window.__jb.score, verdict: document.getElementById('jbVerdict').textContent };
          taps.push({ beforeScore: before.score, afterScore: after.score, action: before.action, verdict: after.verdict });
          setTimeout(tick, 50);
        }, 130);
      }, sleep);
    }
    jukeboxStart();
    setTimeout(tick, 700);
  }));
  console.log(JSON.stringify(res, null, 1));
  await b.close();
})();
