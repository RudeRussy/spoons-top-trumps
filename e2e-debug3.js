const puppeteer = require('puppeteer');
const path = require('path');
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  page.on('console', msg => console.log('CONSOLE', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGEERROR', err.message));
  const filePath = 'file://' + path.resolve(__dirname, 'index.html');
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => document.getElementById('buildChip').textContent !== '—', { timeout: 10000 });
  const res = await page.evaluate(() => {
    try {
      window.__game.pendingMode = 'arcade';
      startGame('arcade');
      return { ok: true, phase: window.__game.phase, tableHidden: document.getElementById('screen-table').classList.contains('hidden') };
    } catch(e) { return { ok: false, err: e.message + ' | ' + e.stack }; }
  });
  console.log('direct startGame', res);
  await page.screenshot({ path: path.join(__dirname, 'debug3.png'), fullPage: true });
  await browser.close();
})();
