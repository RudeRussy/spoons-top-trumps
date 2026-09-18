const puppeteer = require('puppeteer');
const fs = require('fs');
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const out = [];
  function log(line){ out.push(line); console.log(line); }

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  page.on('console', msg => {
    const t = msg.type();
    const text = msg.text();
    if (t === 'error' || text.toLowerCase().includes('error') || text.toLowerCase().includes('fail')) {
      log(`PAGEERR[${t}]: ${text}`);
    }
  });
  page.on('pageerror', err => log(`PAGEERROR: ${err.message}`));
  page.on('response', resp => {
    if (!resp.ok() && !resp.url().includes('favicon')) log(`HTTP ${resp.status()}: ${resp.url()}`);
  });

  const fileUrl = 'file://' + __dirname + '/index.html';
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  await sleep(300);

  const screens = [
    { name: 'iPhoneSE1', w: 320, h: 568, kbH: 220 },
    { name: 'iPhoneSE2', w: 375, h: 667, kbH: 220 },
    { name: 'iPhone12',  w: 390, h: 844, kbH: 220 }
  ];

  let allOk = true;

  for (const s of screens) {
    await page.setViewport({ width: s.w, height: s.h, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await page.goto(fileUrl + '?v=' + Date.now(), { waitUntil: 'networkidle0' });
    await sleep(300);

    await page.evaluate(() => {
      localStorage.removeItem('spoons.me');
      localStorage.removeItem('spoons.sync');
      localStorage.removeItem('spoons.ordered');
      localStorage.removeItem('spoons.acctCache');
      if (typeof openOrderPanel === 'function') openOrderPanel(true);
    });
    await sleep(400);

    const panelVisible = await page.evaluate(() => document.getElementById('orderPanel').classList.contains('open'));
    if (!panelVisible) { log(`${s.name}: order panel NOT open`); allOk = false; continue; }

    // simulate keyboard
    await page.evaluate((h) => {
      const vv = window.visualViewport;
      if (vv) Object.defineProperty(vv, 'height', { value: window.innerHeight - h, configurable: true });
      window.dispatchEvent(new Event('resize'));
      if (typeof adjustOrderPanelForKeyboard === 'function') adjustOrderPanelForKeyboard();
    }, s.kbH);
    await sleep(250);

    const handle = 'TEST' + Math.floor(Math.random()*10000);
    await page.focus('#signupName');
    await sleep(150);
    await page.type('#signupName', handle, { delay: 5 });
    await sleep(150);
    await page.keyboard.press('Enter');
    await sleep(200);
    const activeAfterName = await page.evaluate(() => document.activeElement.id);
    log(`${s.name}: after name Enter active=${activeAfterName}`);
    if (activeAfterName !== 'btnSignupGo') allOk = false;

    // GO reachable
    let goRect = await page.evaluate(() => {
      const b = document.getElementById('btnSignupGo');
      const r = b.getBoundingClientRect();
      const inner = document.querySelector('.order-inner').getBoundingClientRect();
      return { goTop: r.top, goBottom: r.bottom, innerTop: inner.top, innerBottom: inner.bottom, innerH: inner.height };
    });
    let reachable = goRect.goBottom <= goRect.innerBottom + 2 && goRect.goTop >= goRect.innerTop - 2;
    if (!reachable){
      await page.evaluate(() => { document.querySelector('.order-inner').scrollTo({ top: 9999, behavior: 'instant' }); });
      await sleep(200);
      goRect = await page.evaluate(() => {
        const b = document.getElementById('btnSignupGo');
        const r = b.getBoundingClientRect();
        const inner = document.querySelector('.order-inner').getBoundingClientRect();
        return { goTop: r.top, goBottom: r.bottom, innerTop: inner.top, innerBottom: inner.bottom, innerH: inner.height };
      });
      reachable = goRect.goBottom <= goRect.innerBottom + 2;
    }
    log(`${s.name}: GO rect top=${goRect.goTop.toFixed(0)} bottom=${goRect.goBottom.toFixed(0)} innerH=${goRect.innerH.toFixed(0)} reachable=${reachable}`);
    if (!reachable) allOk = false;

    await page.keyboard.press('Enter');
    await sleep(1500);

    const signedIn = await page.evaluate((handle) => {
      const me = JSON.parse(localStorage.getItem('spoons.me') || 'null');
      return me && me.name === handle ? me.name : null;
    }, handle);
    log(`${s.name}: signedInAs=${signedIn}`);
    if (!signedIn) allOk = false;
  }

  // login flow via Enter only (LIV93 / 4321)
  await page.setViewport({ width: 375, height: 667, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(fileUrl + '?v=' + Date.now(), { waitUntil: 'networkidle0' });
  await sleep(300);
  await page.evaluate(() => {
    localStorage.removeItem('spoons.me');
    localStorage.removeItem('spoons.sync');
    localStorage.removeItem('spoons.ordered');
    localStorage.removeItem('spoons.acctCache');
    localStorage.setItem('spoons.ordered', '1');
    if (typeof openOrderPanel === 'function') openOrderPanel(true);
    if (typeof setAuthTab === 'function') setAuthTab('login');
  });
  await sleep(400);
  await page.focus('#signupName');
  await page.type('#signupName', 'LIV93', { delay: 5 });
  await page.keyboard.press('Enter');
  await sleep(200);
  await page.type('#signupPin', '4321', { delay: 5 });
  await sleep(150);
  await page.keyboard.press('Enter');
  await sleep(1500);
  const loginName = await page.evaluate(() => {
    const me = JSON.parse(localStorage.getItem('spoons.me') || 'null');
    return me ? me.name : null;
  });
  const inGame = await page.evaluate(() => !document.getElementById('screen-table').classList.contains('hidden'));
  const modeSet = await page.evaluate(() => window.__game && window.__game.mode);
  log(`LOGIN LIV93/4321: signedInAs=${loginName} inGame=${inGame} mode=${modeSet}`);
  if (loginName !== 'LIV93' || !inGame) allOk = false;

  const pageErrs = await page.evaluate(() => window.__errs || []);
  log(`PAGE ERRORS: ${JSON.stringify(pageErrs.slice(-20))}`);

  await browser.close();

  fs.writeFileSync('verify-signup-mobile.log', out.join('\n') + '\noverall=' + (allOk ? 'OK' : 'FAIL') + '\n');
  console.log('\noverall=' + (allOk ? 'OK' : 'FAIL'));
  process.exit(allOk ? 0 : 1);
})();
