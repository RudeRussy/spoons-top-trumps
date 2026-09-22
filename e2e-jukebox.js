const puppeteer = require('puppeteer');
const filePath = 'http://localhost:8765/index.html';

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 320, height: 568, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const errors = [];
  page.on('pageerror', err => { errors.push(err.toString()); });
  page.on('console', msg => { console.log('PAGE', msg.type(), msg.text()); if (msg.type() === 'error') errors.push('console.error: ' + msg.text()); });
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  const result = await page.evaluate(() => new Promise((resolve) => {
    console.log('e2e eval start');
    const taps = [];
    const start = Date.now();
    let running = true;

    function fireTap(x, y, holdMs){
      const target = document.getElementById('jbMachineWrap') || document.body;
      const opts = { bubbles: true, cancelable: true, pointerId: 1, pointerType: 'touch', clientX: x, clientY: y };
      target.dispatchEvent(new PointerEvent('pointerdown', opts));
      if (holdMs > 0){
        setTimeout(() => target.dispatchEvent(new PointerEvent('pointerup', opts)), holdMs);
      } else {
        target.dispatchEvent(new PointerEvent('pointerup', opts));
      }
    }

    function tick(){
      if (!running || Date.now() - start > 13000){
        resolve({ taps, score: window.__jb ? window.__jb.score : 0 });
        return;
      }
      const p = window.__jb && window.__jb.activePrompt;
      const wrap = document.getElementById('jbMachineWrap');
      const gameOver = document.getElementById('jbLandlord').classList.contains('show');
      const done = document.getElementById('jbEndPanel').classList.contains('show');
      if (!p || !wrap || gameOver || done || p.hit || p.missed){
        setTimeout(tick, 35); return;
      }
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2 + 20;
      const targetT = p.fakeBeat * window.__jb.beatDur;
      const lead = (p.def && p.def.action === 'hold') ? 0.05 : 0.10;
      const nowT = window.__jb.audioTime;
      const sleepMs = Math.max(0, Math.min(3000, (targetT - nowT - lead) * 1000));
      console.log('tick plan beat', p.fakeBeat, 'target', targetT.toFixed(3), 'now', nowT.toFixed(3), 'sleep', sleepMs);
      const before = { score: window.__jb.score, streak: window.__jb.streak, lives: document.getElementById('jbLives').textContent, action: document.getElementById('jbAction').textContent };
      setTimeout(() => {
        const afterSleep = window.__jb.audioTime;
        console.log('firing at', afterSleep.toFixed(3));
        if (p.def && p.def.action === 'hold'){
          fireTap(cx, cy, 800);
          setTimeout(() => {
            const after = { score: window.__jb.score, streak: window.__jb.streak, lives: document.getElementById('jbLives').textContent, verdict: document.getElementById('jbVerdict').textContent };
            taps.push({ beforeScore:before.score, afterScore:after.score, beforeStreak:before.streak, afterStreak:after.streak, livesAfter:after.lives, action:before.action, verdict:after.verdict });
            if (after.lives === '') running = false;
            setTimeout(tick, 50);
          }, 900);
        } else {
          fireTap(cx, cy, 0);
          setTimeout(() => {
            const after = { score: window.__jb.score, streak: window.__jb.streak, lives: document.getElementById('jbLives').textContent, verdict: document.getElementById('jbVerdict').textContent };
            taps.push({ beforeScore:before.score, afterScore:after.score, beforeStreak:before.streak, afterStreak:after.streak, livesAfter:after.lives, action:before.action, verdict:after.verdict });
            if (after.lives === '') running = false;
            setTimeout(tick, 50);
          }, 120);
        }
      }, sleepMs);
    }

    setTimeout(() => {
      if (typeof jukeboxStart !== 'function') { resolve({ error:'jukeboxStart missing', taps }); return; }
      jukeboxStart();
      console.log('jukebox started', !!window.__jb);
      setTimeout(tick, 600);
    }, 300);
  }));

  const overflow = await page.evaluate(() => {
    const docWidth = document.documentElement.scrollWidth;
    const docHeight = document.documentElement.scrollHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return { docWidth, docHeight, vw, vh, bodyOverflow: getComputedStyle(document.body).overflow, hasScrollbars: docWidth > vw || docHeight > vh };
  });

  const build = await page.evaluate(() => typeof BUILD_STAMP !== 'undefined' ? BUILD_STAMP : 'missing');
  const out = {
    build,
    taps: result.taps,
    scoreRises: result.taps.filter(t => t.afterScore > t.beforeScore).length,
    hits: result.taps.filter(t => t.verdict && (t.verdict.includes('ON THE BEAT') || t.verdict.includes('ACCEPTABLE'))).length,
    misses: result.taps.filter(t => t.verdict && (t.verdict.includes('EARLY') || t.verdict.includes('LATE') || t.verdict.includes('MISSED') || t.verdict.includes('MISERABLE'))).length,
    errors,
    overflow320: overflow
  };
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
  process.exit(0);
})();
