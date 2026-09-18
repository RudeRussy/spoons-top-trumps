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
    // Use a fresh page per size to avoid navigation timeouts after form submits
    await page.goto(fileUrl + '?v=' + Date.now(), { waitUntil: 'networkidle0' });
    await sleep(300);

    await page.evaluate(() => {
      localStorage.removeItem('spoons.me');
      localStorage.removeItem('spoons.sync');
      localStorage.removeItem('spoons.ordered');
      if (typeof openOrderPanel === 'function') openOrderPanel(true);
    });
    await sleep(400);

    const panelVisible = await page.evaluate(() => document.getElementById('orderPanel').classList.contains('open'));
    if (!panelVisible) { log(`${s.name}: order panel NOT open`); allOk = false; continue; }

    // simulate keyboard: shrink visual viewport by overriding visualViewport.height
    await page.evaluate((h) => {
      const vv = window.visualViewport;
      if (vv) {
        Object.defineProperty(vv, 'height', { value: window.innerHeight - h, configurable: true });
      }
      window.dispatchEvent(new Event('resize'));
      if (typeof adjustOrderPanelForKeyboard === 'function') adjustOrderPanelForKeyboard();
    }, s.kbH);
    await sleep(250);

    const handle = 'TEST' + Math.floor(Math.random()*10000);
    // focus name, type, enter to pub
    await page.focus('#signupName');
    await sleep(150);
    await page.type('#signupName', handle, { delay: 5 });
    await sleep(150);
    await page.keyboard.press('Enter');
    await sleep(200);
    const activeAfterName = await page.evaluate(() => document.activeElement.id);
    log(`${s.name}: after name Enter active=${activeAfterName}`);
    if (activeAfterName !== 'signupPub') allOk = false;

    await page.type('#signupPub', 'My Local Pub', { delay: 5 });
    await sleep(150);
    await page.keyboard.press('Enter');
    await sleep(200);
    const activeAfterPub = await page.evaluate(() => document.activeElement.id);
    log(`${s.name}: after pub Enter active=${activeAfterPub}`);
    if (activeAfterPub !== 'signupPin') allOk = false;

    await page.type('#signupPin', '1234', { delay: 5 });
    await sleep(150);

    // check GO reachable (inside scrollable order-inner)
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
      reachable = goRect.goBottom <= goRect.innerBottom + 2 && goRect.goTop >= goRect.innerTop - 2;
    }
    log(`${s.name}: GO rect top=${goRect.goTop.toFixed(0)} bottom=${goRect.goBottom.toFixed(0)} innerH=${goRect.innerH.toFixed(0)} reachable=${reachable}`);
    if (!reachable) allOk = false;

    // press Enter on pin to submit form
    await page.keyboard.press('Enter');
    await sleep(1000);

    const signedIn = await page.evaluate((handle) => {
      const me = JSON.parse(localStorage.getItem('spoons.me') || 'null');
      return me && me.name === handle ? me.name : null;
    }, handle);
    log(`${s.name}: signedInAs=${signedIn}`);
    if (!signedIn) allOk = false;

    // verify cloud write: read account blob via textdb
    const cloud = await page.evaluate(async (handle) => {
      try {
        const key = 'spoons-acct-' + handle.toLowerCase();
        const r = await fetch('https://textdb.online/' + key, { headers: { 'User-Agent': 'SpoonsTopTrumpsBot/1.0' }, signal: AbortSignal.timeout(5000) });
        if (!r.ok) return { ok: false, status: r.status };
        return { ok: true, text: (await r.text()).slice(0, 200) };
      } catch(e){ return { ok: false, error: e.message }; }
    }, handle);
    log(`${s.name}: cloudWrite=${cloud.ok} ${cloud.ok ? 'textOK' : cloud.status || cloud.error}`);
    if (!cloud.ok) allOk = false;
  }

  // login flow via Enter only (LIV93 / 4321)
  await page.setViewport({ width: 375, height: 667, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(fileUrl + '?v=' + Date.now(), { waitUntil: 'networkidle0' });
  await sleep(300);
  await page.evaluate(() => {
    localStorage.removeItem('spoons.me');
    localStorage.removeItem('spoons.sync');
    localStorage.removeItem('spoons.ordered');
    // skip the order gate so login goes straight to game
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
