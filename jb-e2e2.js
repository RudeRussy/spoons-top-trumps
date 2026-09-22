
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
      const target = document.getElementById('jbMachineWrap') || document.body;
      const opts = { bubbles:true, cancelable:true, pointerId:1, pointerType:'touch' };
      target.dispatchEvent(new PointerEvent('pointerdown', opts));
      target.dispatchEvent(new PointerEvent('pointerup', opts));
    }
    function tick(){
      const crash = (window.__crashLog || []).slice(-3);
      if (crash.length){ resolve({ CRASHED: true, crash, taps }); return; }
      if (Date.now() - start > 12000){ resolve({ done:true, taps, score: window.__jb.score }); return; }
      const pr = window.__jb && window.__jb.activePrompt;
      if (!pr || pr.hit || pr.missed){ setTimeout(tick, 40); return; }
      const targetT = pr.fakeBeat * window.__jb.beatDur;
      const nowT = window.__jb.audioTime;
      const sleep = Math.max(0, Math.min(2500, (targetT - nowT - 0.08) * 1000));
      setTimeout(() => { fireTap(); setTimeout(tick, 60); }, sleep);
    }
    jukeboxStart();
    setTimeout(tick, 700);
  }));
  console.log(JSON.stringify(res, null, 1));
  await b.close();
})();
