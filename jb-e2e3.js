
const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.setViewport({ width: 320, height: 568, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await p.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle0' });
  const res = await p.evaluate(async () => {
    const log = [];
    jukeboxStart();
    for (let i = 0; i < 10; i++){
      await new Promise(r => setTimeout(r, 1000));
      log.push({ i, t: Math.round(window.__jb.audioTime), beats: window.__jb.beats.length,
        prompts: window.__jb.prompts.length, active: window.__jb.activePrompt ? window.__jb.activePrompt.def.label : null,
        done: window.__jb.done, gameOver: window.__jb.gameOver, lives: window.__jb.lives,
        verdict: document.getElementById('jbVerdict').textContent,
        crash: (window.__crashLog || []).length });
    }
    return log;
  });
  console.log(JSON.stringify(res, null, 1));
  await b.close();
})();
