const puppeteer = require('puppeteer');
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const b = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const p = await b.newPage();
  p.on('console', m => console.log('PAGELOG', m.type(), m.text()));
  await p.goto('file://' + require('path').resolve('index.html'));
  await p.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await p.evaluate(() => {
    localStorage.removeItem('spoons.me');
    localStorage.removeItem('spoons.sync');
    localStorage.removeItem('spoons.ordered');
    openOrderPanel(true);
    setAuthTab('new');
  });
  const h = 'TEST' + Date.now().toString().slice(-4);
  await p.type('#signupName', h);
  await p.keyboard.press('Enter');
  await p.type('#signupPub', 'My Local');
  await p.keyboard.press('Enter');
  await p.type('#signupPin', '1234');
  await p.keyboard.press('Enter');
  await sleep(2000);
  const state1 = await p.evaluate(() => ({
    me: localStorage.getItem('spoons.me'),
    cache: localStorage.getItem('spoons.acctCache'),
    err: document.getElementById('signupNameError').textContent,
    crash: window.__crashLog.slice(-1)[0]
  }));
  console.log('after2s', JSON.stringify(state1));
  // Force fetchAccountBlob directly
  const direct = await p.evaluate((handle) => {
    return fetchAccountBlob(handle).then(r => JSON.stringify({ ok: r.ok, status: r.status, offline: r.offline }));
  }, h);
  console.log('direct fetch', direct);
  await sleep(2000);
  const state2 = await p.evaluate(() => ({
    me: localStorage.getItem('spoons.me'),
    cache: localStorage.getItem('spoons.acctCache'),
    err: document.getElementById('signupNameError').textContent,
    crash: window.__crashLog.slice(-1)[0]
  }));
  console.log('after4s', JSON.stringify(state2));
  await b.close();
})();
