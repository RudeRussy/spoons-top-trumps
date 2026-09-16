const puppeteer = require('puppeteer');
const path = require('path');
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  const filePath = 'file://' + path.resolve(__dirname, 'index.html') + '?nocache=' + Date.now();
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => document.getElementById('buildChip').textContent !== '—', { timeout: 10000 });
  await page.evaluate(() => { localStorage.removeItem('spoons.me'); });
  await page.click('#btnArcade');
  await page.waitForFunction(() => document.getElementById('orderPanel').classList.contains('open'), { timeout: 10000 });
  await wait(400);
  await page.evaluate(() => { document.getElementById('signupName').value = 'OVER' + Math.floor(Math.random()*100000); document.getElementById('signupPub').value = 'TEST LOCAL'; doSignup(); });
  await page.waitForFunction(() => !document.getElementById('screen-table').classList.contains('hidden'), { timeout: 15000 });
  await wait(300);
  await page.evaluate(async () => {
    let guard = 500;
    while (game.phase !== 'over' && guard--) {
      if (game.phase === 'play' && game.turnOwner === 'player') {
        const btn = document.querySelector('#playerCard .stat');
        if (btn) btn.click();
      } else if (game.phase === 'reveal') { const b = document.getElementById('btnNext'); if (b) b.click(); }
      await new Promise(r => setTimeout(r, 50));
    }
    console.log('autoplay ended guard', guard, 'phase', game.phase);
  });
  await wait(200);
  const info = await page.evaluate(() => ({
    phase: game.phase,
    tableHidden: document.getElementById('screen-table').classList.contains('hidden'),
    overHidden: document.getElementById('screen-over').classList.contains('hidden'),
    overDisplay: document.getElementById('screen-over').style.display,
    score: game.score,
    ledger: scoreLedger.length
  }));
  console.log('info', info);
  await page.screenshot({ path: path.join(__dirname, 'debug-over.png'), fullPage: true });
  await browser.close();
})();
