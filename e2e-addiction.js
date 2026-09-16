const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const wait = ms => new Promise(r => setTimeout(r, ms));
const TABLE_CENTER_X = 195;
const filePath = 'file://' + path.resolve(__dirname, 'index.html');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'], protocolTimeout: 120000 });

  const errors = [];
  async function freshPage(){
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    page.on('pageerror', err => errors.push('pageerror: ' + err.message));
    page.on('console', msg => { if (msg.type() === 'error') errors.push('console.error: ' + msg.text()); });
    await page.goto(filePath, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.getElementById('buildChip').textContent !== '—', { timeout: 10000 });
    return { context, page };
  }

  const results = {};

  // ===== Phase 1 =====
  let { context: ctx1, page } = await freshPage();
  results.build = await page.evaluate(() => document.getElementById('buildChip').textContent);

  await page.click('#btnArcade');
  await page.waitForFunction(() => document.getElementById('orderPanel').classList.contains('open'), { timeout: 10000 });
  await wait(300);
  const handle = 'T' + Math.floor(Math.random() * 100000);
  await page.evaluate(h => { document.getElementById('signupName').value = h; document.getElementById('signupPub').value = 'TEST LOCAL'; doSignup(); }, handle);
  await page.waitForFunction(() => !document.getElementById('screen-table').classList.contains('hidden'), { timeout: 15000 });
  await wait(300);

  await page.waitForSelector('#playerCard .stat', { timeout: 10000 });
  const stats = await page.$$('#playerCard .stat');
  if (stats[0]) await stats[0].click();
  else throw new Error('no player stat button');
  await page.waitForFunction(() => document.getElementById('btnNext'), { timeout: 10000 });

  const nextBox = await page.evaluate(() => {
    const b = document.getElementById('btnNext');
    const r = b.getBoundingClientRect();
    return { x: r.left, y: r.top, width: r.width, height: r.height, center: r.left + r.width / 2 };
  });
  results.nextCenter = nextBox.center;
  results.nextCentred = Math.abs(nextBox.center - TABLE_CENTER_X) <= 20;

  const cardHeights = await page.evaluate(() => {
    const pc = document.querySelector('#playerCard .card');
    const ac = document.querySelector('#aiCard .card');
    return { player: pc ? pc.getBoundingClientRect().height : 0, ai: ac ? ac.getBoundingClientRect().height : 0 };
  });
  results.cardHeights = cardHeights;
  results.cardsEqualHeight = Math.abs(cardHeights.player - cardHeights.ai) <= 2;

  const fmInfo = await page.evaluate(() => {
    const man = document.getElementById('fartMan');
    if (!man) return null;
    const px = man.querySelectorAll('.fm-px, .fm-pants, .fm-shirt, .fm-head, .fm-skin, .fm-shoes, .fm-belly');
    let shadows = 0;
    px.forEach(el => { if (el.style.boxShadow) shadows += el.style.boxShadow.split(',').length; });
    return {
      width: window.getComputedStyle(man).width,
      height: window.getComputedStyle(man).height,
      pxCount: px.length,
      shadows,
      hasBelly: !!man.querySelector('.fm-belly'),
      hasHead: !!man.querySelector('.fm-head'),
      hasShirt: !!man.querySelector('.fm-shirt'),
      hasShoes: !!man.querySelector('.fm-shoes')
    };
  });
  results.fartMan = fmInfo;

  const scoreBeforeQuit = await page.evaluate(() => game.score);
  await page.click('#homeChip');
  await page.waitForFunction(() => !document.getElementById('screen-title').classList.contains('hidden'), { timeout: 5000 });
  const scoreAfterQuit = await page.evaluate(() => document.getElementById('scoreChip').textContent);
  results.scoreBeforeQuit = scoreBeforeQuit;
  results.scoreAfterQuit = scoreAfterQuit;
  results.scoreLeakFixed = scoreAfterQuit.trim() === '000000';
  await ctx1.close();

  // ===== Phase 2: game-over breakdown =====
  let { context: ctx2, page: p2 } = await freshPage();
  await p2.click('#btnArcade');
  await p2.waitForFunction(() => document.getElementById('orderPanel').classList.contains('open'), { timeout: 10000 });
  await wait(300);
  const handle2 = 'T2' + Math.floor(Math.random() * 100000);
  await p2.evaluate(h => { document.getElementById('signupName').value = h; document.getElementById('signupPub').value = 'TEST LOCAL'; doSignup(); }, handle2);
  await p2.waitForFunction(() => !document.getElementById('screen-table').classList.contains('hidden'), { timeout: 15000 });
  await wait(300);

  await p2.evaluate(async () => {
    let guard = 1200;
    while (game.phase !== 'over' && guard--) {
      if (game.phase === 'play' && game.turnOwner === 'player') {
        const btn = document.querySelector('#playerCard .stat');
        if (btn) btn.click();
      } else if (game.phase === 'reveal') {
        const b = document.getElementById('btnNext');
        if (b) b.click();
      }
      await new Promise(r => setTimeout(r, 80));
    }
  });
  await p2.waitForFunction(() => !document.getElementById('screen-over').classList.contains('hidden'), { timeout: 120000 });
  const breakdown = await p2.evaluate(() => {
    const box = document.getElementById('scoreBreakdown');
    return { visible: box.style.display !== 'none', rows: box.querySelectorAll('.sb-row').length, totalText: box.textContent.slice(0, 160) };
  });
  results.breakdown = breakdown;
  await ctx2.close();

  // ===== Phase 3: duplicate-name rejection =====
  let { context: ctx3, page: p3 } = await freshPage();
  await p3.click('#btnArcade');
  await p3.waitForFunction(() => document.getElementById('orderPanel').classList.contains('open'), { timeout: 10000 });
  await wait(300);
  const dupHandle = 'D' + Math.floor(Math.random() * 100000);
  await p3.evaluate(h => { document.getElementById('signupName').value = h; document.getElementById('signupPub').value = 'TEST LOCAL'; doSignup(); }, dupHandle);
  await p3.waitForFunction(() => !document.getElementById('screen-table').classList.contains('hidden'), { timeout: 15000 });
  await wait(300);
  // Submit this name to the global board so it is registered
  await p3.evaluate(async () => {
    game.score = 1234;
    await boardSubmit({ win: true, expectedElo: 1200 });
  });
  await wait(500);
  // Remove device claim and order unlock so signup wall reappears
  await p3.evaluate(() => {
    localStorage.removeItem('spoons.me');
    localStorage.removeItem('spoons.hasOrdered');
  });
  await p3.click('#homeChip');
  await p3.waitForFunction(() => !document.getElementById('screen-title').classList.contains('hidden'), { timeout: 5000 });
  await p3.click('#btnArcade');
  await p3.waitForFunction(() => document.getElementById('orderPanel').classList.contains('open'), { timeout: 10000 });
  await wait(400);
  await p3.waitForFunction(() => typeof boardCache !== 'undefined' && boardCache && !!boardCache.players, { timeout: 15000 });
  await p3.evaluate(h => { document.getElementById('signupName').value = h; document.getElementById('signupPub').value = 'TEST LOCAL'; doSignup(); }, dupHandle);
  await wait(500);
  const dupError = await p3.evaluate(() => {
    const e = document.getElementById('signupNameError');
    return e && e.style.display !== 'none' && e.textContent.includes('TAKEN');
  });
  results.duplicateNameRejected = dupError;

  await p3.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await p3.screenshot({ path: path.join(__dirname, 'e2e-addiction.png'), fullPage: true });
  await ctx3.close();
  await browser.close();

  const out = { ...results, pageErrors: errors, passed: results.nextCentred && results.cardsEqualHeight && results.scoreLeakFixed && breakdown.visible && dupError && errors.length === 0 };
  fs.writeFileSync(path.join(__dirname, 'e2e-addiction.json'), JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out, null, 2));
  process.exit(out.passed ? 0 : 1);
})();
