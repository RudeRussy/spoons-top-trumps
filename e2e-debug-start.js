const puppeteer = require('puppeteer');
const path = require('path');
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  const filePath = 'file://' + path.resolve(__dirname, 'index.html') + '?nocache=' + Date.now();
  page.on('console', msg => console.log('CONSOLE', msg.type(), msg.text()));
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => document.getElementById('buildChip').textContent !== '—', { timeout: 10000 });
  await page.evaluate(() => { localStorage.clear(); });
  await wait(200);
  await page.click('#btnArcade');
  await wait(500);
  const info = await page.evaluate(() => ({
    titleHidden: document.getElementById('screen-title').classList.contains('hidden'),
    orderOpen: document.getElementById('orderPanel').classList.contains('open'),
    tableHidden: document.getElementById('screen-table').classList.contains('hidden'),
    phase: window.__game ? window.__game.phase : 'no game'
  }));
  console.log('info', info);
  await page.screenshot({ path: path.join(__dirname, 'debug-start.png'), fullPage: true });
  await browser.close();
})();
