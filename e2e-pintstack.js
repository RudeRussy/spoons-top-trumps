const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');
const wait = ms => new Promise(r => setTimeout(r, ms));
const root = __dirname;
const PORT = 9915;
const server = http.createServer((req, res) => {
  const p = path.join(root, req.url === '/' || req.url === '/index.html' ? 'index.html' : req.url);
  fs.readFile(p, (err, data) => { if (err) { res.writeHead(404); res.end(); return; } res.writeHead(200, { 'Content-Type': path.extname(p) === '.mp3' ? 'audio/mpeg' : 'text/html' }); res.end(data); });
});

(async () => {
  await new Promise(r => server.listen(PORT, r));
  const errors = [];
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  async function freshPage(w, h){
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
    page.on('pageerror', err => errors.push('pageerror: ' + err.message));
    page.on('console', msg => { const t = msg.text(); if (msg.type() === 'error' && !t.includes('Failed to load resource')) errors.push('console.error: ' + t); });
    page.on('response', res => { if (res.status() === 404) { const u = res.url(); if (!u.includes('/index.html?')) errors.push('404 response: ' + u); } });
    await page.goto('http://localhost:' + PORT + '/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => !document.getElementById('screen-title').classList.contains('hidden'), { timeout: 10000 });
    return { context, page };
  }
  const results = {};

  let { context: ctx1, page } = await freshPage(390, 844);
  results.build = await page.evaluate(() => typeof BUILD_STAMP !== 'undefined' ? BUILD_STAMP : '');
  await page.click('#btnArcade');
  await page.waitForFunction(() => document.getElementById('orderPanel').classList.contains('open'), { timeout: 10000 });
  await wait(300);
  await page.click('#btnPlayDemo');
  await page.waitForFunction(() => !document.getElementById('screen-table').classList.contains('hidden'), { timeout: 15000 });
  await wait(300);
  await page.evaluate(() => { debugPintstack(); });
  await page.waitForFunction(() => !document.getElementById('screen-pintstack').classList.contains('hidden'), { timeout: 10000 });
  await wait(400);

  const taps = [];
  for (let i = 0; i < 40; i++){
    const before = await page.evaluate(() => Number(document.getElementById('psCount').textContent));
    const box = await page.evaluate(() => { const r = document.getElementById('psCanvasWrap').getBoundingClientRect(); return {x:r.x,y:r.y,w:r.width,h:r.height}; });
    const t = (i % 5) / 4;
    await page.mouse.click(box.x + box.w*(0.3 + t*0.4), box.y + box.h*0.5);
    await wait(1200);
    const after = await page.evaluate(() => Number(document.getElementById('psCount').textContent));
    taps.push({i, before, after});
    if (after >= 8) break;
  }
  results.taps = taps.slice(0, 15);
  results.finalCount = await page.evaluate(() => Number(document.getElementById('psCount').textContent));
  results.finalLives = await page.evaluate(() => document.getElementById('psLives').textContent);
  results.finalMulti = await page.evaluate(() => document.getElementById('psMulti').textContent);
  results.finalScore = await page.evaluate(() => Number(document.getElementById('psScore').textContent));
  results.verdict = await page.evaluate(() => document.getElementById('psVerdict').textContent);

  const b = await page.evaluate(() => { const r = document.getElementById('psBank').getBoundingClientRect(); return {x:r.x,y:r.y,w:r.width,h:r.height}; });
  await page.mouse.click(b.x + b.w/2, b.y + b.h/2);
  await wait(700);
  results.bank = await page.evaluate(() => ({
    pintHidden: document.getElementById('screen-pintstack').classList.contains('hidden'),
    tableHidden: document.getElementById('screen-table').classList.contains('hidden')
  }));
  await ctx1.close();

  let { context: ctx2, page: p2 } = await freshPage(320, 568);
  await p2.click('#btnArcade');
  await p2.waitForFunction(() => document.getElementById('orderPanel').classList.contains('open'), { timeout: 10000 });
  await wait(200);
  await p2.click('#btnPlayDemo');
  await p2.waitForFunction(() => !document.getElementById('screen-table').classList.contains('hidden'), { timeout: 15000 });
  await p2.evaluate(() => { debugPintstack(); });
  await p2.waitForFunction(() => !document.getElementById('screen-pintstack').classList.contains('hidden'), { timeout: 10000 });
  await wait(300);
  const fit = await p2.evaluate(() => {
    const wrap = document.getElementById('psCanvasWrap');
    const r = wrap.getBoundingClientRect();
    return { wrapW: Math.round(r.width), wrapH: Math.round(r.height), vw: window.innerWidth, vh: window.innerHeight, overflowX: document.documentElement.scrollWidth > window.innerWidth };
  });
  results.fit320 = fit;
  results.fits320 = fit.wrapW <= fit.vw && fit.wrapH <= fit.vh * 0.85 && !fit.overflowX;
  await ctx2.close();

  await browser.close();
  const passed = errors.length === 0 && results.finalCount >= 8 && results.bank.pintHidden && results.fits320;
  results.pageErrors = errors;
  results.passed = passed;
  fs.writeFileSync(path.join(__dirname, 'e2e-pintstack.json'), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  process.exit(passed ? 0 : 1);
})().catch(e => { console.error(e); process.exit(1); });
