
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const wait = ms => new Promise(r => setTimeout(r, ms));
const filePath = 'http://127.0.0.1:8765/index.html';

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'], protocolTimeout: 120000 });
  const errors = [];
  async function freshPage(w, h){
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await page.setViewport({ width: w || 390, height: h || 844, deviceScaleFactor: 2 });
    page.on('pageerror', err => errors.push('pageerror: ' + err.message));
    page.on('console', msg => { if (msg.type() === 'error') errors.push('console.error: ' + msg.text()); else if (msg.type()==='log') console.log('PAGE LOG:', msg.text()); });
    await page.goto(filePath, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForFunction(() => !document.getElementById('screen-title').classList.contains('hidden'), { timeout: 10000 });
    return { context, page };
  }

  const results = {};

  // === 390x844 flow ===
  let { context: ctx1, page } = await freshPage(390, 844);
  results.build = await page.evaluate(() => typeof BUILD_STAMP !== 'undefined' ? BUILD_STAMP : '');

  await page.click('#btnArcade');
  await page.waitForFunction(() => document.getElementById('orderPanel').classList.contains('open'), { timeout: 10000 });
  await wait(300);
  const handle = 'BW' + Math.floor(Math.random() * 100000);
  await page.evaluate(h => { document.getElementById('signupName').value = h; document.getElementById('signupPub').value = 'TEST LOCAL'; doSignup(); }, handle);
  await page.waitForFunction(() => !document.getElementById('screen-table').classList.contains('hidden'), { timeout: 15000 });
  await wait(300);

  // Arm bonus via offerBonus and tap the pill.
  await page.evaluate(() => { offerBonus('bogwall'); game.__bonusPillArmed = true; updateBonusPill(); });
  await page.waitForFunction(() => document.getElementById('bonusPill').classList.contains('show'), { timeout: 5000 });
  await page.evaluate(() => document.getElementById('bonusPill').click());
  await page.waitForFunction(() => !document.getElementById('screen-bogwall').classList.contains('hidden'), { timeout: 10000 });
  await wait(400);

  const canvas = await page.$('#bwCanvas');
  const box = await canvas.boundingBox();
  async function stroke(page, sx, sy, ex, ey){
    const rect = await page.$eval('#bwCanvas', el => { const r=el.getBoundingClientRect(); return {x:r.left,y:r.top}; });
    await wait(10);
    await page.evaluate(({sx,sy,ex,ey}) => {
      const el = document.getElementById('bwCanvas');
      const r = el.getBoundingClientRect();
      el.dispatchEvent(new PointerEvent('pointerdown',{clientX:r.left+sx,clientY:r.top+sy,bubbles:true,pointerId:1,isPrimary:true}));
      el.dispatchEvent(new PointerEvent('pointermove',{clientX:r.left+ex,clientY:r.top+ey,bubbles:true,pointerId:1,isPrimary:true}));
      el.dispatchEvent(new PointerEvent('pointerup',{clientX:r.left+ex,clientY:r.top+ey,bubbles:true,pointerId:1,isPrimary:true}));
    }, {sx,sy,ex,ey});
    await wait(40);
  }

  const tiles = [];
  for (let tile = 1; tile <= 3; tile++){
    const start = Date.now();
    await stroke(page, box.width*0.1, box.height*0.1, box.width*0.8, box.height*0.8);
    await stroke(page, box.width*0.2, box.height*0.8, box.width*0.8, box.height*0.2);
    await page.evaluate(() => document.getElementById('bwDone').click());
    await wait(tile === 3 ? 1500 : 800);
    const label = await page.evaluate(() => document.getElementById('bwTileLabel').textContent);
    const score = await page.evaluate(() => Number(document.getElementById('bwScore').textContent));
    tiles.push({ tile, label, score, elapsed: Date.now() - start });
  }
  results.tiles = tiles;
  const rating = await page.$eval('#bwVerdictBig', el => el.textContent);
  const banked = await page.$eval('#bwScoreLine', el => el.textContent);
  results.rating = rating;
  results.banked = banked;
  await page.evaluate(() => document.getElementById('bwBank').click());
  await page.waitForFunction(() => !document.getElementById('screen-table').classList.contains('hidden'), {timeout:10000});
  await wait(1200);
  let tableScore = await page.evaluate(() => Number(document.getElementById('scoreChipVal').textContent));
  if (!tableScore){ await wait(1000); tableScore = await page.evaluate(() => Number(document.getElementById('scoreChipVal').textContent)); }
  const verdict = await page.$eval('#verdict', el => el.textContent);
  results.tableScore = tableScore;
  results.verdict = verdict;

  // check no horizontal overflow
  results.fit390 = await page.evaluate(() => ({ overflowX: document.documentElement.scrollWidth > window.innerWidth, overflowY: document.documentElement.scrollHeight > window.innerHeight }));
  await ctx1.close();

  // === 320x568 fit check ===
  let { context: ctx2, page: p2 } = await freshPage(320, 568);
  await p2.evaluate(() => { offerBonus('bogwall'); game.__bonusPillArmed = true; updateBonusPill(); });
  await p2.waitForFunction(() => document.getElementById('bonusPill').classList.contains('show'), { timeout: 5000 });
  await p2.evaluate(() => document.getElementById('bonusPill').click());
  await p2.waitForFunction(() => !document.getElementById('screen-bogwall').classList.contains('hidden'), { timeout: 10000 });
  await wait(300);
  const fit = await p2.evaluate(() => {
    const wrap = document.getElementById('bwCanvasWrap');
    const r = wrap.getBoundingClientRect();
    return { wrapW: r.width, wrapH: r.height, vw: window.innerWidth, vh: window.innerHeight, overflowX: document.documentElement.scrollWidth > window.innerWidth };
  });
  results.fit320 = fit;
  results.fits320 = fit.wrapW <= fit.vw && fit.wrapH <= fit.vh * 0.75 && !fit.overflowX;
  await ctx2.close();

  await browser.close();

  const criticalErrors = errors.filter(e => {
    return !/CORS|ERR_FAILED|Failed to load resource|net::ERR|fetch at|requestfailed|the server responded with a status of 404/.test(e);
  });
  const passed = criticalErrors.length === 0 && tiles.length === 3 && tiles[2].score > 0 && results.fits320 && /BOG WALL/.test(verdict);
  const out = { ...results, pageErrors: errors, passed };
  fs.writeFileSync(path.join(__dirname, 'e2e-bogwall.json'), JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out, null, 2));
  process.exit(passed ? 0 : 1);
})().catch(e => { console.error(e); process.exit(1); });
