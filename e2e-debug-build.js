const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  const filePath = 'file://' + path.resolve(__dirname, 'index.html') + '?nocache=' + Date.now();
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => document.getElementById('buildChip').textContent !== '—', { timeout: 10000 });
  const txt = await page.evaluate(() => document.getElementById('buildChip').textContent);
  console.log('build', txt);
  await browser.close();
})();
