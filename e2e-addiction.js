const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const wait = ms => new Promise(r => setTimeout(r, ms));
const TABLE_CENTER_X = 195;

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  const errors = [];
  page.on('pageerror', err => errors.push('pageerror: ' + err.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push('console.error: ' + msg.text()); });

  function filePath(){ return 'file://' + path.resolve(__dirname, 'index.html') + '?nocache=' + Date.now(); }

  async function gotoFresh(){
    await page.goto(filePath(), { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => document.getElementById('buildChip').textContent !== '—', { timeout: 10000 });
    await page.evaluate(() => localStorage.clear());
  }

  const results = {};

  // ===== Phase 1: fresh signup, play one round, check NEXT/cards/fart/quit leak =====
  await gotoFresh();
  results.build = await page.evaluate(() => document.getElementById('buildChip').textContent);

  await page.click('#btnArcade');
  await page.waitForFunction(() => document.getElementById('orderPanel').classList.contains('open'), { timeout: 10000 });
  await wait(300);
  const handle = 'TEST' + Math.floor(Math.random() * 100000);
  await page.evaluate(h => {
    document.getElementById('signupName').value = h;
    document.getElementById('signupPub').value = 'TEST LOCAL';
    doSignup();
  }, handle);
  await page.waitForFunction(() => !document.getElementById('screen-table').classList.contains('hidden'), { timeout: 15000 });
  await wait(300);

  // play a round
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

  // ===== Phase 2: fresh game autoplayed to game over, check breakdown =====
  await gotoFresh();
  await page.click('#btnArcade');
  await page.waitForFunction(() => document.getElementById('orderPanel').classList.contains('open'), { timeout: 10000 });
  await wait(300);
  const handle2 = 'TEST2' + Math.floor(Math.random() * 100000);
  await page.evaluate(h => {
    document.getElementById('signupName').value = h;
    document.getElementById('signupPub').value = 'TEST LOCAL';
    doSignup();
  }, handle2);
  await page.waitForFunction(() => !document.getElementById('screen-table').classList.contains('hidden'), { timeout: 15000 });
  await wait(300);

  await page.evaluate(async () => {
    let guard = 600;
    while (game.phase !== 'over' && guard--) {
      if (game.phase === 'play' && game.turnOwner === 'player') {
        const btn = document.querySelector('#playerCard .stat');
        if (btn) btn.click();
      } else if (game.phase === 'reveal') {
        const b = document.getElementById('btnNext');
        if (b) b.click();
      }
      await new Promise(r => setTimeout(r, 50));
    }
  });
  await page.waitForFunction(() => !document.getElementById('screen-over').classList.contains('hidden'), { timeout: 45000 });
  const breakdown = await page.evaluate(() => {
    const box = document.getElementById('scoreBreakdown');
    return { visible: box.style.display !== 'none', rows: box.querySelectorAll('.sb-row').length, totalText: box.textContent.slice(0, 160) };
  });
  results.breakdown = breakdown;

  // ===== Phase 3: duplicate-name rejection =====
  await gotoFresh();
  // First register a name
  await page.click('#btnArcade');
  await page.waitForFunction(() => document.getElementById('orderPanel').classList.contains('open'), { timeout: 10000 });
  await wait(300);
  const dupHandle = 'DUPE' + Math.floor(Math.random() * 100000);
  await page.evaluate(h => {
    document.getElementById('signupName').value = h;
    document.getElementById('signupPub').value = 'TEST LOCAL';
    doSignup();
  }, dupHandle);
  await page.waitForFunction(() => !document.getElementById('screen-table').classList.contains('hidden'), { timeout: 15000 });
  // Submit a result so name appears on board
  await page.evaluate(() => {
    game.score = 1234;
    game.phase = 'over';
    showScreen('over');
  });
  await wait(500);
  // Use a fresh browser context? Can't easily, but we can clear localStorage me and try to sign up again with same name while boardCache now contains it.
  await page.evaluate(() => localStorage.removeItem('spoons.me'));
  await page.click('#homeChip');
  await page.waitForFunction(() => !document.getElementById('screen-title').classList.contains('hidden'), { timeout: 5000 });
  await page.click('#btnArcade');
  await page.waitForFunction(() => document.getElementById('orderPanel').classList.contains('open'), { timeout: 10000 });
  await wait(400);
  await page.waitForFunction(() => typeof boardCache !== 'undefined' && boardCache && !!boardCache.players, { timeout: 15000 });
  await page.evaluate(h => {
    document.getElementById('signupName').value = h;
    document.getElementById('signupPub').value = 'TEST LOCAL';
    doSignup();
  }, dupHandle);
  await wait(500);
  const dupError = await page.evaluate(() => {
    const e = document.getElementById('signupNameError');
    return e && e.style.display !== 'none' && e.textContent.includes('TAKEN');
  });
  results.duplicateNameRejected = dupError;

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.screenshot({ path: path.join(__dirname, 'e2e-addiction.png'), fullPage: true });
  await browser.close();

  const out = { ...results, pageErrors: errors, passed: results.nextCentred && results.cardsEqualHeight && results.scoreLeakFixed && breakdown.visible && dupError && errors.length === 0 };
  fs.writeFileSync(path.join(__dirname, 'e2e-addiction.json'), JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out, null, 2));
  process.exit(out.passed ? 0 : 1);
})();
