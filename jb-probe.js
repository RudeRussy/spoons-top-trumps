
const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.setViewport({ width: 320, height: 568, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  p.on('pageerror', e => console.log('PAGEERR', e.toString()));
  await p.goto('http://localhost:8765/index.html', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));
  const res = await p.evaluate(async () => {
    jukeboxStart();
    await new Promise(r => setTimeout(r, 2500));
    return {
      crashLog: (window.__crashLog || []).slice(-5),
      jbOn: window.__jb ? window.__jb.on : 'NO __jb',
      beats: window.__jb ? window.__jb.beats.length : -1,
      prompts: window.__jb ? window.__jb.prompts.length : -1,
      activePrompt: window.__jb ? (window.__jb.activePrompt ? window.__jb.activePrompt.def.label : null) : 'no jb',
      audioTime: window.__jb ? window.__jb.audioTime : -1
    };
  });
  console.log(JSON.stringify(res, null, 1));
  await b.close();
})();
