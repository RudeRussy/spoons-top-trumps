const puppeteer = require('puppeteer');
const path = require('path');
const wait = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  const filePath = 'file://' + path.resolve(__dirname, 'index.html') + '?nocache=' + Date.now();
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  const hasLog = await page.evaluate(() => document.documentElement.innerHTML.includes('doSignup resume check'));
  console.log('hasLog in html', hasLog);
  await browser.close();
})();
