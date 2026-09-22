
const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.setViewport({ width: 320, height: 568, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await p.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle0' });
  const res = await p.evaluate(() => new Promise((resolve) => {
    const log = [];
    // Monkey-patch: wrap jbMiss + capture diff by wrapping Math.abs? Simpler: wrap
    // jbUpdateBeats to also record the last (t, nowBeat) when called from jbHit.
    const origUpdate = window.jbUpdateBeats;
    window.__hitLog = [];
    const origHit = window.jbHit;
    window.jbHit = function(kind){
      // replicate the math BEFORE the real call:
      const pr = window.__jb.activePrompt;
      if (pr){
        const t = window.__jb.audioTime;
        const diff = Math.abs(t - pr.fakeBeat * window.__jb.beatDur) * 1000;
        window.__hitLog.push({ kind, label: pr.def.label, beat: pr.fakeBeat, beatDur: window.__jb.beatDur,
          target: +(pr.fakeBeat * window.__jb.beatDur).toFixed(3), tAtCall: +t.toFixed ? null : null,
          note: 't computed inside fn' });
      }
      return origHit(kind);
      function origHit(){ return window.jbHitOrig(kind); }
    };
    // simpler: just instrument audioTime at pointerdown:
    const target = document.getElementById('jbCanvasWrap');
    target.addEventListener('pointerdown', (e) => {
      const pr = window.__jb.activePrompt;
      window.__lastDown = pr ? { label: pr.def.label, audioTime: +window.__jb.audioTime.toFixed(4),
        target: +(pr.fakeBeat * window.__jb.beatDur).toFixed(3), beatDur: window.__jb.beatDur,
        isBallad: window.__jb.isBallad, startClock: window.__jb.startClock } : null;
    }, true);
    const start = Date.now();
    function tick(){
      if (Date.now() - start > 9000){ resolve({ log, hitLog: window.__hitLog }); return; }
      const pr = window.__jb && window.__jb.activePrompt;
      if (!pr || pr.hit || pr.missed){ requestAnimationFrame(tick); return; }
      const targetT = pr.fakeBeat * window.__jb.beatDur;
      const nowT = window.__jb.audioTime;
      if (targetT - nowT <= 0.065){
        const opts = { bubbles:true, cancelable:true, pointerId:1, pointerType:'touch' };
        target.dispatchEvent(new PointerEvent('pointerdown', opts));
        target.dispatchEvent(new PointerEvent('pointerup', opts));
        log.push({ dispatchedAudioTime: +window.__jb.audioTime.toFixed(3), lastDown: window.__lastDown,
          verdict: document.getElementById('jbVerdict').textContent });
        requestAnimationFrame(tick);
      } else requestAnimationFrame(tick);
    }
    jukeboxStart();
    requestAnimationFrame(tick);
  }));
  console.log(JSON.stringify(res, null, 1));
  await b.close();
})();
